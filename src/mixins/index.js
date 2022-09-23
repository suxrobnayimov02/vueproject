import XLSX from "xlsx";

export default {
  methods: {
    getError(errors, name) {
      if (errors[name]) {
        return errors[name][0];
      }
  
      return null;
    },
    exportTable(name) {
      var date = this.formatDate(new Date().toString(), "DD.MM.YYYY");
      var tbl = document.getElementById("reportTable");
      var wb = XLSX.utils.table_to_book(tbl, { sheet: "Sheet JS", raw: true });
      XLSX.writeFile(wb, name + date + ".xlsx");
      
    },
    formatNumber(number) {
      return new Intl.NumberFormat("ru-RU").format(number);
    },
    getPercent(item1, item2) {
      if (item1 && item2 && item1 > 0 && item2 > 0) {
        let item = Math.round(100 * (item2 / item1) * 100) / 100;
        return (item <= 100 ? item : 100) + "%";
      }
      return 0;
    },
    formatDate(value, format = "DD.MM.YYYY HH:mm:ss") {
      let dateClass = value != "" ? new Date(value) : new Date();
      if (format.search("YYYY") >= 0) {
        format = format.replace("YYYY", String(dateClass.getFullYear()));
      }
      if (format.search("MM") >= 0) {
        let monthInt = dateClass.getMonth() + 1;
        let month = monthInt > 9 ? monthInt : "0" + monthInt;
        format = format.replace("MM", String(month));
      }
      if (format.search("DD") >= 0) {
        let day =
          dateClass.getDate() > 9
            ? dateClass.getDate()
            : "0" + dateClass.getDate();
        format = format.replace("DD", String(day));
      }
      if (format.search("HH") >= 0) {
        let hours =
          dateClass.getHours() > 9
            ? dateClass.getHours()
            : "0" + dateClass.getHours();
        format = format.replace("HH", String(hours));
      }
      if (format.search("mm") >= 0) {
        let minutes =
          dateClass.getMinutes() > 9
            ? dateClass.getMinutes()
            : "0" + dateClass.getMinutes();
        format = format.replace("mm", String(minutes));
      }
      if (format.search("ss") >= 0) {
        let seconds =
          dateClass.getSeconds() > 9
            ? dateClass.getSeconds()
            : "0" + dateClass.getSeconds();
        format = format.replace("ss", String(seconds));
      }
      return format;
      // return moment(String(value)).format(format)
    },
  }
  
};
