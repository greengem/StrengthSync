import prisma from '../../../../../utils/prisma';

export async function DELETE(request, { params }) {
    const { routineId } = params;
    if (!routineId) {
        return new Response(JSON.stringify({ error: 'Routine ID is required.' }), { status: 400 });
    }
    try {
        await prisma.workoutPlan.delete({
            where: { id: routineId },
        });
        return new Response(JSON.stringify({ success: true, message: 'Routine deleted successfully.' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
