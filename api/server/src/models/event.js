'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: DataTypes.DATE,
      user: {
        type: DataTypes.STRING,
        allowNull: false
      },
      otheruser: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: DataTypes.TEXT
    },
    {}
  );
  return Event;
};
