"use strict";
const assert = require("assert");

const { DB_URL, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

assert(DB_URL, "DB Url is required");
assert(JWT_SECRET, "JWT key is required");

module.exports = {
	DB_URL,
	JWT_SECRET,
	JWT_EXPIRES_IN
};
