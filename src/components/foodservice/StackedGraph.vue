<template>
    <div>
        <charts :options="chartOptions"></charts>
    </div>
</template>

<script>
    export default {
        name:"stackedgraph",
        props:["foods"],
        data(){
            return{
                allfoods:{},
                chartOptions:{
                        chart: {
                            type: 'column'
                        },
                        events:{
                              events: {
                                drilldown: function(e) {
                                if (!e.seriesOptions) {
                                    this.vueRef.updateGraph(true, this, e);
                                }
                                },
                                drillup: function(e) {
                                if (!e.seriesOptions.flag) {
                                    this.vueRef.drilldownLevel = e.seriesOptions._levelNumber;
                                    this.vueRef.updateGraph(false);
                                }
                                }
                            }
                        },
                        title: {
                            text: 'Browser market shares. January, 2018'
                        },
                        xAxis: {
                            type: 'category'
                        },
                        yAxis: {
                            title: {
                                text: 'Total percent market share'
                            }

                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions: {
                            series: {
                                borderWidth: 0,
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.y:.1f}%'
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                        },
                        series: [
                        {
                            name: "Nutrition",
                            colorByPoint: true,
                            data: [
                                {
                                    name: "Chrome",
                                    y: 62.74,
                                    drilldown: "Chrome"
                                },
                                {
                                    name: "Firefox",
                                    y: 10.57,
                                    drilldown: "Firefox"
                                },
                                {
                                    name: "Internet Explorer",
                                    y: 7.23,
                                    drilldown: "Internet Explorer"
                                },
                                {
                                    name: "Safari",
                                    y: 5.58,
                                    drilldown: "Safari"
                                },
                                {
                                    name: "Edge",
                                    y: 4.02,
                                    drilldown: "Edge"
                                },
                                {
                                    name: "Opera",
                                    y: 1.92,
                                    drilldown: "Opera"
                                },
                                {
                                    name: "Other",
                                    y: 7.62,
                                    drilldown: null
                                }
                            ]
                        }
                    ],
                    drilldown: {
                        series: [
                            {
                                name: "Chrome",
                                id: "Chrome",
                                data: [
                                    [
                                        "v65.0",
                                        0.1
                                    ],
                                    [
                                        "v64.0",
                                        1.3
                                    ],
                                    [
                                        "v63.0",
                                        53.02
                                    ],
                                    [
                                        "v62.0",
                                        1.4
                                    ],
                                    [
                                        "v61.0",
                                        0.88
                                    ],
                                    [
                                        "v60.0",
                                        0.56
                                    ],
                                    [
                                        "v59.0",
                                        0.45
                                    ],
                                    [
                                        "v58.0",
                                        0.49
                                    ],
                                    [
                                        "v57.0",
                                        0.32
                                    ],
                                    [
                                        "v56.0",
                                        0.29
                                    ],
                                    [
                                        "v55.0",
                                        0.79
                                    ],
                                    [
                                        "v54.0",
                                        0.18
                                    ],
                                    [
                                        "v51.0",
                                        0.13
                                    ],
                                    [
                                        "v49.0",
                                        2.16
                                    ],
                                    [
                                        "v48.0",
                                        0.13
                                    ],
                                    [
                                        "v47.0",
                                        0.11
                                    ],
                                    [
                                        "v43.0",
                                        0.17
                                    ],
                                    [
                                        "v29.0",
                                        0.26
                                    ]
                                ]
                            },
                            {
                                name: "Firefox",
                                id: "Firefox",
                                data: [
                                    [
                                        "v58.0",
                                        1.02
                                    ],
                                    [
                                        "v57.0",
                                        7.36
                                    ],
                                    [
                                        "v56.0",
                                        0.35
                                    ],
                                    [
                                        "v55.0",
                                        0.11
                                    ],
                                    [
                                        "v54.0",
                                        0.1
                                    ],
                                    [
                                        "v52.0",
                                        0.95
                                    ],
                                    [
                                        "v51.0",
                                        0.15
                                    ],
                                    [
                                        "v50.0",
                                        0.1
                                    ],
                                    [
                                        "v48.0",
                                        0.31
                                    ],
                                    [
                                        "v47.0",
                                        0.12
                                    ]
                                ]
                            },
                            {
                                name: "Internet Explorer",
                                id: "Internet Explorer",
                                data: [
                                    [
                                        "v11.0",
                                        6.2
                                    ],
                                    [
                                        "v10.0",
                                        0.29
                                    ],
                                    [
                                        "v9.0",
                                        0.27
                                    ],
                                    [
                                        "v8.0",
                                        0.47
                                    ]
                                ]
                            },
                            {
                                name: "Safari",
                                id: "Safari",
                                data: [
                                    [
                                        "v11.0",
                                        3.39
                                    ],
                                    [
                                        "v10.1",
                                        0.96
                                    ],
                                    [
                                        "v10.0",
                                        0.36
                                    ],
                                    [
                                        "v9.1",
                                        0.54
                                    ],
                                    [
                                        "v9.0",
                                        0.13
                                    ],
                                    [
                                        "v5.1",
                                        0.2
                                    ]
                                ]
                            },
                            {
                                name: "Edge",
                                id: "Edge",
                                data: [
                                    [
                                        "v16",
                                        2.6
                                    ],
                                    [
                                        "v15",
                                        0.92
                                    ],
                                    [
                                        "v14",
                                        0.4
                                    ],
                                    [
                                        "v13",
                                        0.1
                                    ]
                                ]
                            },
                            {
                                name: "Opera",
                                id: "Opera",
                                data: [
                                    [
                                        "v50.0",
                                        0.96
                                    ],
                                    [
                                        "v49.0",
                                        0.82
                                    ],
                                    [
                                        "v12.1",
                                        0.14
                                    ]
                                ]
                            }
                        ]
                    }
                }
            }
        },
        created(){
            this.$EventBus.$on('update_stackedgraph_value', () => {
                this.graphUpdate();
            });
        },
        methods: {
            graphUpdate(){
                let calory={
                                name: "calory",
                                id: "calory",
                                data: []
                            };
                let carbo=[];
                let protein=[];
                let fat=[];
                let sugar=[];
                let natrium=[];
                let chole=[];
                let fattyacid=[];
                let transfat=[];
                this.chartOptions.series.data=[];
                for (let i = 0; i < this.foods.length; i++) {
                    calory.data.push([this.foods[i].name,this.foods[i].calory]);
                    carbo.data.push([this.foods[i].name,this.foods[i].carbo]);
                    protein.data.push([this.foods[i].name,this.foods[i].protein]);
                    fat.data.push([this.foods[i].name,this.foods[i].fat]);
                    sugar.data.push([this.foods[i].name,this.foods[i].sugar]);
                    natrium.data.push([this.foods[i].name,this.foods[i].natrium]);
                    chole.data.push([this.foods[i].name,this.foods[i].chole]);
                    fattyacid.data.push([this.foods[i].name,this.foods[i].fattyacid]);
                    transfat.data.push([this.foods[i].name,this.foods[i].transfat]);
                    this.allfoods.calory+=this.foods[i].calory;
                    this.allfoods.carbo+=this.foods[i].carbo;
                    this.allfoods.protein+=this.foods[i].protein;
                    this.allfoods.fat+=this.foods[i].fat;
                    this.allfoods.sugar+=this.foods[i].sugar;
                    this.allfoods.natrium+=this.foods[i].natrium;
                    this.allfoods.chole+=this.foods[i].chole;
                    this.allfoods.fattyacid+=this.foods[i].fattyacid;
                    this.allfoods.transfat+=this.foods[i].transfat;
                }
                this.chartOptions.series.data.push({
                    name:"calory",
                    y:this.allfoods.calory,
                    drilldown:"calory"
                });
                this.chartOptions.series.data.push({
                    name:"carbo",
                    y:this.allfoods.carbo,
                    drilldown:"carbo"
                });
                this.chartOptions.series.data.push({
                    name:"protein",
                    y:this.allfoods.protein,
                    drilldown:"protein"
                });
                this.chartOptions.series.data.push({
                    name:"fat",
                    y:this.allfoods.fat,
                    drilldown:"fat"
                });
                this.chartOptions.series.data.push({
                    name:"sugar",
                    y:this.allfoods.sugar,
                    drilldown:"sugar"
                });
                this.chartOptions.series.data.push({
                    name:"natrium",
                    y:this.allfoods.natrium,
                    drilldown:"natrium"
                });
                this.chartOptions.series.data.push({
                    name:"chole",
                    y:this.allfoods.chole,
                    drilldown:"chole"
                });
                this.chartOptions.series.data.push({
                    name:"fattyacid",
                    y:this.allfoods.fattyacid,
                    drilldown:"fattyacid"
                });
                this.chartOptions.series.data.push({
                    name:"transfat",
                    y:this.allfoods.transfat,
                    drilldown:"transfat"
                });

            },
            
        },
    }
</script>

<style lang="scss" scoped>
    // .stackedgraph{
    //     width: 400px;
    // }
</style>