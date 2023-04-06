import noteSchema from "./schema/schema.js";

export const addNoteData = async (req, res) => {
  try {
    const { title, description } = req.body;
    const created = await noteSchema.create({ title, description });
    console.log("data Posted on DB");
    console.log(created);
    if (created) {
      res.send(
        JSON.stringify({
          status: 201,
          message: "Data Posted",
          data: created,
        })
      );
    } else {
      res.send(
        JSON.stringify({
          status: 404,
          message: "Document Not created",
          data: null,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const getNoteData = async (req, res) => {
  try {
    const data = await noteSchema.find();
    if (data) {
      res.send(
        JSON.stringify({
          status: 200,
          message: "Documents Found",
          data: data,
        })
      );
    } else {
      res.send(
        JSON.stringify({
          status: 204,
          message: "No Data was Found in Database",
          data: null,
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const delNoteData = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await noteSchema.findById(id);

    if (data) {
      const deleted = data.deleteOne({ id });
      if (deleted) {
        res.send(
          JSON.stringify({
            status: 200,
            message: "Document Deleted ",
            data: deleted,
          })
        );
      }
    } else {
      res.send(
        JSON.stringify({
          status: 404,
          message: "Document not found  ",
          data: null,
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const modifyNote = async (req, res) => {
  try {
    const { id, title, description } = req.body;
    console.log(id);
    const data = await noteSchema.findById(id);
    console.log(data);
    if (data) {
      const updateNote = await noteSchema.findByIdAndUpdate(
        data,

        {
          title,
          description,
        }
      );
      console.log(updateNote);
      res.send(
        JSON.stringify({
          status: 200,
          message: "Document Found",
          data: data,
        })
      );
    } else {
      res.send(
        JSON.stringify({
          status: 404,
          message: "Document not  Found",
          data: null,
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
};
