const Store = require("../models/storeModel");
const { query, queriesList } = require("../db/dbQuery");
const getStoreList = async (req, res) => {
  try {
    let storesData = await query(queriesList.GET_STORE_LIST);
    let stores = storesData.rows;
    // if (stores.length == 0) {
    //   res.status(200).send({
    //     status: "success",
    //     length: 0,
    //     message: "No stores yet",
    //   });
    // }
    res.status(200).send({
      status: "success",
      length: stores.length,
      message:
        stores.length > 0 ? "stores fetched successfully" : "No stores yet",
      data: stores,
    });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: "failed to fetch stores",
      error: err,
    });
  }
};

const getStoreById = async (req, res) => {
  let { storeId } = req.params;
  storeId = Number(storeId);
  if (!storeId) {
    return res.status(400).send({
      status: "failed",
      message: "valid store id (number) is required",
    });
  }

  try {
    let storeData = await query(queriesList.GET_STORE_BY_ID, [storeId]);
    let store = storeData.rows[0];
    if (!store) {
      return res.status(404).send({
        status: "failed",
        message: "store not found",
      });
    }

    res.status(200).send({
      status: "success",
      message: "store fetched successfully",
      data: store,
    });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: "failed to fetch store",
      error: err,
    });
  }
};

const addStore = async (req, res) => {
  let { name, address } = req.body;
  if (!name || !address) {
    return res.status(400).send({
      status: "failed",
      message: "name and address are required",
    });
  }
  const store = new Store(null, name, address);
  try {
    const dbRes = await query(queriesList.ADD_STORE, [
      store.name,
      store.address,
    ]);
    res.status(201).send({
      status: "success",
      message: "store added successfully",
      data: dbRes.rows[0],
    });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: "failed to add store",
      error: err,
    });
  }
};

module.exports = {
  getStoreList,
  getStoreById,
  addStore,
};
