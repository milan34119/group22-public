// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import { ca } from 'date-fns/locale';
import { connect } from 'http2';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.location.deleteMany();
    await prisma.activity.deleteMany();
    await prisma.planner.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();


    //LOCATIONS
    const leuven = await prisma.location.create({
        data: {
            name: "Leuven",
            description: "hoofdstad van vlaams braband"
        },
    });

    const brussel = await prisma.location.create({
        data: {
            name: "brussel",
            description: "hoofdstad van Belgie"
        }
    });

    const lyon = await prisma.location.create({
        data: {
            name: "Lyon"
        }
    });

    //USERS
    const casper = await prisma.user.create({
        data: {
            name: "Casper123",
            email: "casper@gmail.com",
            password: "password123",
            role: "admin"
        }
    });

    const milan = await prisma.user.create({
        data: {
            name: "Milan",
            email: "milan@gmail.com",
            password: "1234567"
        }
    });

    const dummy = await prisma.user.create({
        data: {
            name: "Dummy",
            email: "dummy@gmail.com",
            password: "dummydummy1"
        }
    })

    //ACTIVITIES
    const stadhuis = await prisma.activity.create({
        data: {
            name: "Bezoek stadhuis",
            description: "Een bezoek aan het stadhuis van leuven.",
            location: {
                connect: leuven
            }
        }
    });

    const atomium = await prisma.activity.create({
        data: {
            name: "Bezoek atomium",
            description: "Een bezoek aan het atomium in brussel.",
            location: {
                connect: brussel
            }
        }
    });

    const basiliek = await prisma.activity.create({
        data: {
            name: "Bezoek basiliek",
            description: "Een bezoek aan de basiliek van lyon.",
            location: {
                connect: lyon
            }
        }
    });

    //POSTS
    const casper_basiliek = await prisma.post.create({
        data: {
            name: "mijn bezoek aan de basiliek!",
            description: "ik ben vandaag de basiliek vna lyon gaan bezoeken.",
            activity: {
                connect: basiliek
            },
            user: {
                connect: casper
            }
        }
    });

    const casper_stadhuis = await prisma.post.create({
        data: {
            name: "mijn bezoek aan het stadhuis!",
            description: "ik ben vandaag het stadhuis van leuven gaan bezoeken.",
            activity: {
                connect: stadhuis
            },
            user: {
                connect: casper
            }
        }
    });

    const milan_stadhuis = await prisma.post.create({
        data: {
            name: "Tripke leuven",
            description: "ik heb het stadhuis bezocht tijdens men tripke leuven",
            activity: {
                connect: stadhuis
            },
            user: {
                connect: milan
            }
        }
    });

    const milan_atomium = await prisma.post.create({
        data: {
            name: "Tripke brussel",
            description: "ik heb het atomium bezocht tijdens men tripke brussel",
            activity: {
                connect: atomium
            },
            user: {
                connect: milan
            }
        }
    });

    //PLANNER
    const belgie_trip = await prisma.planner.create({
        data: {
            name: "Trip to belgium",
            description: "plans for my trip to belgium next year",
            User: {
                connect: dummy
            },
            activities: {
                connect: [atomium, stadhuis]
            }
        }
    });

    const lyon_trip = await prisma.planner.create({
        data: {
            name: "Trip naar lyon",
            description: "dingen om in lyon te doen",
            User: {
                connect: milan
            },
            activities: {
                connect: [basiliek]
            }
        }
    });

    const duitsland_trip = await prisma.planner.create({
        data: {
            name: "Trip naar duitsland",
            description: "ideën voor duitsland vakantie",
            User: {
                connect: milan
            },
            activities: {
                connect: []
            }
        }
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();