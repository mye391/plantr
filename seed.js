const db = require('./models');


const {
    vegetable: Vegetable,
    gardener: Gardener,
    plot: Plot,
    vegetable_plot: VegetablePlot
} = db.models

let vegetables, gardeners, plots;

db
    .sync({force: true})
    .then(() => {
        const vegetableData = [
            {
                name: 'Carrot',
                color: 'orange'
            },
            {
                name: 'Tomato',
                color: 'red'
            },
            {
                name: 'Pepper',
                color: 'green'
            }
        ]

        return Vegetable.bulkCreate(vegetableData, { returning: true })
    })
    .then(createdVegetables => {
        vegetables = createdVegetables;
        const [carrot, tomato, pepper] = vegetables;
        const gardenerData = [
            {
                name: 'Oliver',
                age: 25,
                favoriteVegetableId: carrot.id
            },
            {
                name: 'Becky',
                age: 27,
                favoriteVegetableId: pepper.id
            },
            {
                name: 'Jane',
                age: 57,
                favoriteVegetableId: tomato.id
            }
        ]
        return Gardener.bulkCreate(gardenerData, { returning: true });
    })
    .then(createdGardeners => {
        gardeners = createdGardeners;
        const [oliver, becky, jane] = gardeners;
        const plotData = [
            {
                size: 20,
                shaded: false,
                gardenerId: oliver.id
            },
            {
                size: 40,
                shaded: true,
                gardenerId: becky.id
            },
            {
                size: 10,
                shaded: false,
                gardenerId: jane.id
            }
        ]
        return Plot.bulkCreate(plotData, { returning: true });
    })
    .then(createdPlots => {
        plots = createdPlots;
        const [oliverPlot, beckyPlot, janePlot] = plots;
        const [carrot, tomato, pepper] = vegetables;
        const vegetablePlotData = [
            {
                vegetableId: carrot.id,
                plotId: oliverPlot.id
            },
            {
                vegetableId: pepper.id,
                plotId: oliverPlot.id
            },
            {
                vegetableId: carrot.id,
                plotId: beckyPlot.id
            },
            {
                vegetableId: pepper.id,
                plotId: beckyPlot.id
            },
            {
                vegetableId: tomato.id,
                plotId: beckyPlot.id
            },
            {
                vegetableId: tomato.id,
                plotId: janePlot.id
            },
            {
                vegetableId: pepper.id,
                plotId: janePlot.id
            }
        ]
        return VegetablePlot.bulkCreate(vegetablePlotData);
    })
    .then(() => {
        console.log('Database synced!');
    })
    .catch(err => {
        console.log('Disaster! Something went wrong!');
        console.log(err);
    })
    .finally(() => {
        db.close();
    });
