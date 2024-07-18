import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ArchitectureService } from '../_services/architecture.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
export interface Architecture {
  id: string;
  name: string;
  user:any;
  dateCreation: Date;
  costEstimation: string;
}


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  architectures: any[] = [];
  architecturesS: Architecture[] = [];
  totalVirtualMachines = 0;
  totalResourceGroups = 0;
  totalApplicationGateways = 0;
  totalVmsses = 0;
  totalVirtualNetworks = 0;
  totalSubnets = 0;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor(
    private architectureService: ArchitectureService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      xaxis: {
        type: "category",
        categories: []
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);}
      else {
    this.loadArchitectures();
    this.getArchitectures();
  }
  }
  


  getArchitectures() {
    this.architectureService.getAllArchitectures().subscribe(architecturesS => {
      this.architecturesS = architecturesS
        .sort((a: Architecture, b: Architecture) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime())
        .slice(0, 5);
    });
  }
  loadArchitectures(): void {
    this.architectureService.getAllArchitectures().subscribe(data => {
      this.architectures = data;
      this.calculateTotals();
      this.updateChart();
    });
  }

  calculateTotals(): void {
    this.totalVirtualMachines = 0;
    this.totalResourceGroups = 0;
    this.totalApplicationGateways = 0;
    this.totalVmsses = 0;
    this.totalVirtualNetworks = 0;
    this.totalSubnets = 0;

    this.architectures.forEach(architecture => {
      this.totalVirtualMachines += architecture.virtualMachines.length;
      this.totalResourceGroups += architecture.resourceGroups.length;
      this.totalApplicationGateways += architecture.applicationGateways.length;
      this.totalVmsses += architecture.vmsses.length;
      this.totalVirtualNetworks += architecture.virtualNetworks.length;
      this.totalSubnets += architecture.subnets.length;
    });
  }

  updateChart(): void {
    // Assuming your data has a date field you want to use for the x-axis
    const dates = this.architectures.map(architecture => architecture.date);
    const vmData = this.architectures.map(architecture => architecture.virtualMachines.length);
    const rgData = this.architectures.map(architecture => architecture.resourceGroups.length);
    const agData = this.architectures.map(architecture => architecture.applicationGateways.length);
    const vmsData = this.architectures.map(architecture => architecture.vmsses.length);
    const vnData = this.architectures.map(architecture => architecture.virtualNetworks.length);
    const subData = this.architectures.map(architecture => architecture.subnets.length);

    this.chartOptions.series = [
      {
        name: "Virtual Machines",
        data: vmData
      },
      {
        name: "Resource Groups",
        data: rgData
      },
      {
        name: "Application Gateways",
        data: agData
      },
      {
        name: "VMSS",
        data: vmsData
      },
      {
        name: "Virtual Networks",
        data: vnData
      },
      {
        name: "Subnets",
        data: subData
      }
    ];

    this.chartOptions.xaxis.categories = dates;
  }
}
