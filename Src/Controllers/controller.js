import News from '../Model/model.js';

export default class Controller {
    async createNews(req, res) {
        try {
            const { title, description, image } = req.body
            if (!title || !description || !image) {
                return res.status(400).json({ error: 'Title, description, and image are required' });
            }
            const news = await News.create({
                title: "atNEWS",
                description: "News-Api",
                image: "https://aaludra.com/wp-content/uploads/elementor/thumbs/ATS-Logo-Dark-qf51hubn4watfdvvq5nev45zos4z8quocij5f9wf3c.png",
                status: "Active",
                release_date: new Date()
            });
            console.log('News created successfully:', news.dataValues);
            res.status(201).json(news);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                console.error('Validation error:', error);
                res.status(400).json({ error: 'Validation error', details: error.errors });
            } else {
                console.error('Failed to create a new record:', error);
                res.status(500).json({ error: 'Failed to create a new record' });
            }
        }
    }

    async getNews(req, res) {
        const {status} = req.body;
        try {
            const news = await News.findAll({ where: { status: status } });
            if (news.length === 0) {
                return res.status(404).json({ message: 'No active news found' });
            }
            console.log('Retrieved all News:', news);
            res.status(201).json(news);
        } catch (error) {
            console.error('Failed to retrieve data: ', error);
            res.status(500).json({ error: 'Failed to retrieve data' });
        }
    }

    async findNewsById(req, res) {
        const { id } = req.params;
        try {
            const news = await News.findOne({ where: { id: id } });
            if (!news) {
                return res.status(404).json({ message: 'news not found' });
            }
            console.log('Retrieved news by ID:', news.dataValues);
            res.status(200).json(news);
        } catch (error) {
            console.error('Failed to retrieve data: ', error);
            res.status(500).json({ message: 'Failed to retrieve data' });
        }
    }

    async deleteById(req, res) {
        const { id } = req.params;
        try {
            const news = await News.destroy({ where: { id: id } });
            if (!news) {
                return res.status(404).json({ message: 'news not found' });
            }
            console.log('Successfully deleted record.');
            res.status(200).json('Successfully deleted record.');
        } catch (error) {
            console.error('Failed to delete record : ', error);
            res.status(500).json({ message: 'Failed to delete data' });
        }
    }

    async softDeleteById(req, res) {
        const { id } = req.params;
        try {
            const [news, data] = await News.update(
                { status: 'Inactive' },
                { where: { id: id, status: 'Active' }, returning: true }
            );
            if (!news) {
                return res.status(404).json({ message: 'News not found or already inactive' });
            }
            console.log('Successfully updated record:', data[0].dataValues);
            res.status(200).json('Successfully updated record status to "Inactive".');
        } catch (error) {
            console.error('Failed to update record status:', error);
            res.status(500).json({ error: 'Failed to update record status', details: error.message });
        }
    }
}
