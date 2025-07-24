import prisma from "../db";

export const postAdminAvailability = async (request, response) => {
    const { date, startHour, endHour, maxAppointments } = request.body;
    const userId = request.user.id;

    //Only admins
    if (request.user.role !== 'ADMIN') {
        return response.status(403).json({ message: "Acces denied" });
    }

    try {
        const existing = await prisma.adminAvailability.findUnique({
            where: {
                date_adminId: {
                    date: new Date(date),
                    adminId: userId
                }
            }
        })

        if (existing) {
            return response.status(400).json({ message: "Availability already set for this date." })
        }

        const Availability = await prisma.adminAvailability.create({
            data: {
                date: new Date(date),
                startHour,
                endHour,
                maxAppointments,
                adminId: userId
            }
        })

        response.status(200).json({ data: Availability })
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Server error" });
    }
}

export const postAppointment = async (request, response) => {
    const { date, hour, service } = request.body;
    const userId = request.user.id;
    const appointmentDate = new Date(date);

    try {
        //Find admin availability for that date
        const availability = await prisma.adminAvailability.findFirst({
            where: {
                date: appointmentDate,
            }
        })

        if (!availability) {
            return response.statue(400).json({ message: "No availability for selected date." })
        }

        // Check time range
        if (hour < availability.startHour || hour >= availability.endHour) {
            return response.status(400).json({ message: "Hour not in availability range." })
        }

        //Check if hour already booked
        const existing = await prisma.appointment.findFirst({
            where: {
                date: appointmentDate,
                hour
            }
        })

        if (existing) {
            return response.status(400).json({ message: "That hour is already booked" })
        }

        // Check total bookings
        const total = await prisma.appointment.count({
            where: {
                date: appointmentDate
            }
        })

        if (total >= availability.maxAppointments) {
            return response.status(400).json({ message: "Max appointments reached for the day." })
        }

        // Create appointment
        const appointment = await prisma.appointment.create({
            data: {
                date: appointmentDate,
                hour,
                service,
                userId
            }
        })

        response.status(200).json({ data: appointment })
    } catch (error) {
        response.status(500).json({ error: "Failed to create appointment" })
    }
}

export const getAppointment = async (request, response) => {
    const { userId } = request.query;

    try {
        const appointments = await prisma.appointment.findMany({
            where: { userId: String(userId) },
            orderBy: { date: 'asc' }
        })

        response.status(200).json({ data: appointments })

    } catch (error) {
        response.status(500).json({ error: "Error fecthing appointments" })
    }
}