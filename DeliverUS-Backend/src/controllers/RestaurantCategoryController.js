import { RestaurantCategory } from '../models/models.js'
const index = async function (req, res) {
  try {
    const restaurantCategories = await RestaurantCategory.findAll()
    res.json(restaurantCategories)
  } catch (err) {
    res.status(500).send(err)
  }
}

const create = async function (req, res) {
  const newcategory = RestaurantCategory.build(req.body)
  try {
    const category = await newcategory.save()
    res.json(category)
  } catch (error) {
    res.status(500).send(error)
  }
}

const RestaurantCategoryController = {
  index,
  create
}
export default RestaurantCategoryController
