import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-map',
    templateUrl: 'map.page.html',
    styleUrls: ['map.page.scss']
})
export class MapPage implements AfterViewInit {
    @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
    // map: any;


    constructor(public router: Router) {
    }

   async ngAfterViewInit() {
        const aMap = await getGaoMaps(
            '8c4a7a97d78253620a34842a9f9e8203'
        );
        const mapEle = this.mapElement.nativeElement;
        const map = new aMap.Map(mapEle, {
                zoom: 12, // 级别
                center: [120.38442818, 36.1052149], // 中心点坐标
            });
        const marker = new aMap.Marker({
            position: new aMap.LngLat(120.41592818, 36.0882149),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '青岛艾姆图'
        });
        map.add(marker);
    }
}


function getGaoMaps(apiKey: string): Promise<any> {
    const win = window as any;
    const gaoModule = win.AMap;
    if (gaoModule && gaoModule.maps) {
        return Promise.resolve(gaoModule.maps);
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://webapi.amap.com/maps?v=1.4.14&key=${apiKey}`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => {
            const gaoModule2 = win.AMap;
            console.log(win);
            if (gaoModule2) {
                resolve(gaoModule2);
            } else {
                reject('gaoDe maps not available');
            }
        };
    });
}
