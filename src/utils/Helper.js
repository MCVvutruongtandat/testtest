"use strict";

/* Application */
const axios = require("axios");
const apiUrl = process.env.API_URL;

class Helper {
  fetchApi = async (url, token) => {
    let _url;
    let _options = {};
    if (url.indexOf("http") != "-1") _url = url;
    else _url = apiUrl + url;
    if (token != "") _options.headers = { Authorization: `Bearer ${token}` };
    return await axios
      .get(_url, _options)
      .then((resp) => resp?.data ?? resp)
      .catch((e) => e);
  };

  postApi = async (url, params, token = "") => {
    let _url;
    let _options = {};
    if (url.indexOf("http") != "-1") _url = url;
    else _url = apiUrl + url;
    if (token != "") _options.headers = { Authorization: `Bearer ${token}` };
    return await axios
      .post(_url, params, _options)
      .then((resp) => {
        return resp?.data ?? resp
      })
      .catch((e) => e);
  };

  putApi = async (url, params, token = "", _options = {}) => {
    let _url;
    if (url.indexOf("http") != "-1") _url = url;
    else _url = apiUrl + url;
    if (token != "") _options.headers = { Authorization: `Bearer ${token}` };
    return await axios
      .put(_url, params, _options)
      .then((resp) => resp?.data ?? resp)
      .catch((e) => e);
  };

  deleteApi = async (url, token = "", params = "") => {
    let _url;
    let _options = {};
    if (url.indexOf("http") != "-1") _url = url;
    else _url = apiUrl + url;
    if (token != "") _options.headers = { Authorization: `Bearer ${token}` };
    if (params != "") _options.data = { ids: params };
    return await axios
      .delete(_url, _options)
      .then((resp) => resp?.data ?? resp)
      .catch((e) => e);
  };

  parseCookie = (str) => {
    if (str) {
      return str
        .split(";")
        .map((v) => v.split("="))
        .reduce((cookie, v) => {
          cookie[decodeURIComponent(v[0].trim())] = decodeURIComponent(
            v[1].trim()
          );
          return cookie;
        }, {});
    } else return "";
  };

  base64Encode = (str) => {
    return Buffer.from(str).toString("base64");
  };

  base64Decode = (str) => {
    return Buffer.from(str, "base64").toString();
  };

  dateFormat = (str) => {
    let _date = new Date(str);
    return (
      _date.getDate() + "/" + (_date.getMonth() + 1) + "/" + _date.getFullYear()
    );
  };

  cleanEmpty = (obj) => {
    if (Array.isArray(obj)) {
      return obj
        .map((v) => (v && typeof v === "object" ? this.cleanEmpty(v) : v))
        .filter((v) => !(v == null));
    } else {
      return Object.entries(obj)
        .map(([k, v]) => [
          k,
          v && typeof v === "object" ? this.cleanEmpty(v) : v,
        ])
        .reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});
    }
  };

  changeToSlug = (str) => {
    let _str = str.trim().toLowerCase();

    return _str
      .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
      .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
      .replace(/đ/gi, "d")
      .replace(/&/g, "-va-")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  capitalize = (str) => {
    if (typeof str === "string" && str != "") {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else return "";
  };

  capitalizeFirstLetter(string) {
    if (typeof string === "string" && string != "") {
      return string.charAt(0).toUpperCase();
    } else return "";
  }

  firstSpin(active,deg_bg) {
    var count_group = document.querySelectorAll(".list-left .group").length;
    var deg_bg = 0;
    var list_color = [
      "linear-gradient(79deg, rgba(94,252,232,1) 0%, rgba(64,57,255,1) 100%)", //facebook
      "linear-gradient(120deg, rgba(255,226,183,1) 0%, rgba(255,0,61,1) 100%)", //youtube
      "linear-gradient(42deg, rgba(249,119,148,1) 0%, rgba(98,58,162,1) 100%)", //tiktok
    ];
    document.querySelector(".bg-rotate").style.transition = "2s";
    document.getElementById("group_item_0").classList.add("active");

    document
	.getElementById("group_item_" + (active - 2 == -1 ? count_group - 1 : active - 2 == -2 ? count_group - 2:active - 2)).classList.remove("active");
    document.getElementById("group_item_" + active).classList.add("active");

    //tốc độ quay
    deg_bg = deg_bg += 50;
    active = active >= count_group - 1 ? 0 : (active += 1);
    document.querySelector(".bg-rotate").style.transform = "rotate(" + deg_bg + "deg)";
    document.querySelector(".bg-rotate").style.background = list_color[active];
  }

  isEmptyObject(obj)
  {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
  }
}

module.exports = new Helper();
