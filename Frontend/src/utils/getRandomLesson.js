function getRandomLesson(lessons, currentLessonId) {
    // 1. Recibe el array (lessons) y 2. La lección actual o su ID (currentLessonOrId)

    // 3. Comprobar que lessons sea un array
    // 4. Comprobar que tenga elementos
    // 5. Si está vacío, devolver null
    if (!Array.isArray(lessons) || lessons.length === 0) {
        return null;
    }

    // 6. Si solo hay una lección, devolver esa misma
    if (lessons.length === 1) {
        return lessons[0];
    }

    // 7. Identificar cuál es la lección actual (extraemos el ID por si nos pasan el objeto completo)
    const currentId = typeof currentLessonId === 'object' && currentLessonId !== null
        ? currentLessonId.id
        : currentLessonId;

    // 8. Excluir la lección actual de las opciones disponibles
    const leccionesDisponibles = lessons.filter(lesson => lesson.id !== currentId);

    // Control de seguridad: si por algún motivo la lista filtrada queda vacía, devolvemos la original
    if (leccionesDisponibles.length === 0) {
        return lessons[0];
    }

    // 9. Generar un índice aleatorio dentro de las opciones restantes
    const indiceAleatorio = Math.floor(Math.random() * leccionesDisponibles.length);

    // 10. Devolver el objeto completo de la lección elegida
    return leccionesDisponibles[indiceAleatorio];
}

export { getRandomLesson }