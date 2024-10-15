

import starBucksImage from '../assets/StarBucks.jpg'; // Adjust the path as needed

export const shops = [
    {
        name: "StarBucks",
        desc: "That green cafe",
        color: "green",
        image: starBucksImage, // Use the imported image
        menus: [
            {
                title: "Best Latte",
                order: "White Mocha Frappuccino with cream",
                price: "27"
            },
            {
                title: "2nd Best Latte",
                order: "Strawberry and Cream Frappuccino",
                price: "25"
            },
        ],
    },
];
