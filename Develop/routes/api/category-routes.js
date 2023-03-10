const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesById = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });

    res.status(200).json(categoriesById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const postNewCategory = await Category.create({
      category_name: req.body.category_name
    });

    res.status(200).json(postNewCategory);

  } catch (err) {
    res.status(500).json(err);

  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {

    const updateCategory = await Category.update(req.body, {
      where: { id: req.params.id }
    });

    res.status(200).json(updateCategory);
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json(delCategory)
  }
  catch (err) {
    res.status(500).json(err)
  }
  // delete a category by its `id` value
});

module.exports = router;
