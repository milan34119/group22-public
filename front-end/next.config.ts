import { NextConfig } from "next";

const { i18n } = require("./next-i18next.config");

const options:NextConfig = {
    i18n,
}

export default options