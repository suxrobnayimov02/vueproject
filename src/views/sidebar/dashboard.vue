<template>
  <div class="dashboard">
    <div class="main-dashboard mb-3">
      <el-row class="card-item" :gutter="20">
        <el-col 
          :span="6"
          class="cart-list"
        >
          <el-card>
            <div class="card-list">
              <div>
                <b-icon 
                  icon="people" 
                  class="people-icon" 
                />
              </div>
              <div>
                <p class="title">
                  Barcha fuqarolar
                </p>
                <b>
                  <count-to
                    :start-val="0"
                    :end-val="3600"
                    :duration="3600"
                  />
                </b>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="card-list">
              <div>
                <img 
                  class="male-icon"
                  src="@/assets/image/logo/man.png" 
                  alt="male"
                >
              </div>
              <div>
                <p class="title">
                  Erkaklar
                </p>
                <b>
                  <count-to
                    :start-val="0"
                    :end-val="1829"
                    :duration="3600"
                  />
                </b>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="card-list">
              <div>
                <img 
                  class="female-icon"
                  src="@/assets/image/logo/female64.png" 
                  alt="male"
                >
              </div>
              <div>
                <p class="title">
                  Ayollar
                </p>
                <b>
                  <count-to
                    :start-val="0"
                    :end-val="1344"
                    :duration="3600"
                  />
                </b>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="card-list check-citizen">
              <div>
                <b-icon 
                  icon="person-check" 
                  class="person-check" 
                />
              </div>
              <div>
                <p class="title">
                  Tasdiqlanganlar
                </p>
                <b>
                  <count-to
                    :start-val="0"
                    :end-val="3425"
                    :duration="3600"
                  />
                </b>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-card class="areaChart">
        <apexchart
          type="area"
          :options="areaChartOptions"
          height="300"
          :series="areaSeries"
        />
      </el-card>
      <el-row 
        class="dashboard-item" 
        :gutter="20"
      >
        <el-col 
          :span="8" 
          class="dashboard-list donut_chart"
        >
          <el-card id="chart">
            <apexchart
              type="donut"
              height="250"
              :options="chartOptions1"
              :series="series1"
            />
          </el-card>
        </el-col>
        <el-col
          :span="8"
          class="dashboard-list"
        >
          <el-card id="chart-radial">
            <apexchart
              type="radialBar"
              :options="radialChartOptions"
              :series="radialSeries"
              height="253"
            />
          </el-card>
        </el-col>
        <el-col 
          :span="8" 
          class="dashboard-list bar_chart"
        >
          <el-card id="chart-circle">
            <apexchart 
              type="bar"
              :options="chartOptions"
              :series="series" 
              height="238"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import '@/assets/scss/main.scss'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CountTo,
  },

  data() {
    return {
      todos: [],
      selectValue: [],
      fullscreenLoading: false,
      areaSeries: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      areaChartOptions: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 57, 22, 43],
        },
        {
          name: "PRODUCT B",
          data: [19, 23, 20, 25, 17, 27],
        },
        {
          name: "PRODUCT C",
          data: [21, 37, 28, 15, 21, 14],
        },
        {
          name: "PRODUCT D",
          data: [24, 17, 25, 19, 22, 18],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
          },
        },
        xaxis: {
          type: "datetime",
          categories: [
            "01/01/2011 GMT",
            "01/02/2011 GMT",
            "01/03/2011 GMT",
            "01/04/2011 GMT",
            "01/05/2011 GMT",
            "01/06/2011 GMT",
          ],
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
      series1: [44, 55, 41, 17, 15],
      chartOptions1: {
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      radialSeries: [72],
      radialChartOptions: {
        chart: {
          height: 350,
          type: "radialBar",
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: "16px",
                color: undefined,
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: "22px",
                color: undefined,
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: ["Median Ratio"],
      },
    };
  },
  async mounted() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await res.json();
    this.todos = todos;
  },

  methods: {
    getColor(completed) {
      if (completed == true) return "success";
      else return "danger";
    },
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: "Yuklanmoqda",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
  },
};
</script>
<style scoped>
.dashboard {
  margin-top: 95px;
}
.main-dashboard .dashboard-item {
  display: flex;
  justify-content: space-between;
}
/* .donut_chart {
  width: 490px;
}
.bar_chart {
  width: 528px;
} */
.areaChart,
.card-item {
  margin: 30px 0;
}
.card-item {
  display: flex;
  justify-content: space-between;
}
.card-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 0px 15px; */
  font-size: 16px;
  font-weight: 500;
  height: 80px;
}
.people-icon {
  font-size: 90px;
  color: rgb(0, 175, 228);
  padding: 10px;
}
.person-check {
  font-size: 90px;
  color: rgb(0, 228, 152);
  padding: 10px;
}
.card-list b {
  font-size: 29px;
  color: rgb(102, 102, 102);
}

.male-icon, .female-icon {
  padding: 10px;
}
</style>
