import json
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro import KPipeline

SAMPLE_RATE = 24000
SILENCIO_INICIAL = 0.20
SILENCIO_FINAL = 0.10
FADE_IN = 0.01

CARPETA_AUDIOS = Path("audios_generados")
ARCHIVO_JSON = Path("Frontend/src/data/verbs.json")

CARPETA_AUDIOS.mkdir(parents=True, exist_ok=True)

with ARCHIVO_JSON.open("r", encoding="utf-8") as archivo:
    sentences = json.load(archivo)
   

pipeline = KPipeline(lang_code="a")

for item in sentences:
    texto = item["sentence"].strip()
    id_json = item["id"]

    if not texto:
        print(f"El ID {id_json} no tiene una frase.")
        continue

    print(f"Procesando ID {id_json}: {texto[:30]}...")

    generator = pipeline(
        texto,
        voice="af_heart",
        speed=0.75
    )

    fragmentos = []

    for _, _, audio in generator:
        if hasattr(audio, "detach"):
            audio = audio.detach().cpu().numpy()

        fragmentos.append(np.asarray(audio, dtype=np.float32))

    if not fragmentos:
        print(f"No se pudo generar el audio del ID {id_json}.")
        continue

    # Unir todos los fragmentos producidos por Kokoro
    audio_completo = np.concatenate(fragmentos)

    # Fundido inicial muy corto para evitar un comienzo brusco
    muestras_fade = min(
        int(SAMPLE_RATE * FADE_IN),
        len(audio_completo)
    )

    audio_completo[:muestras_fade] *= np.linspace(
        0,
        1,
        muestras_fade,
        dtype=np.float32
    )

    silencio_inicial = np.zeros(
        int(SAMPLE_RATE * SILENCIO_INICIAL),
        dtype=np.float32
    )

    silencio_final = np.zeros(
        int(SAMPLE_RATE * SILENCIO_FINAL),
        dtype=np.float32
    )

    audio_final = np.concatenate((
        silencio_inicial,
        audio_completo,
        silencio_final
    ))

    nombre_archivo = CARPETA_AUDIOS / f"sentence_{id_json}.wav"

    sf.write(
        nombre_archivo,
        audio_final,
        SAMPLE_RATE,
        subtype="PCM_16"
    )

print("¡Proceso completado!")