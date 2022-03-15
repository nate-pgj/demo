import { CapacitorUpdater } from 'capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

const updateNow = async () => {
    console.log('恢复');
    // const version = await CapacitorUpdater.download({
    //     // url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.2/dist.zip',
    //     // url: 'http://192.168.1.61/capacitor/download/2.0.0/dist.zip'  // 本地服务器下载失败
    //     url: 'https://github.com/1953089563/demo/releases/download/v2.0.0/dist.zip'
    // })
    // console.log('version', version);
    // show the splashscreen to let the update happen
    SplashScreen.show()
    await CapacitorUpdater.reset();
    SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
}
const requireAll = context => context.keys().map(context);
// const cmyk = require.context('../assets/img_cmyk/', false, /\.jpg$/);
const rgb = require.context('../assets/', false, /\.jpg$/);

export class mainGame extends Phaser.Scene {
    constructor() {
        super({
            key: "MAINGAME",
        });
    }
    preload() {
        const scene = this;
        requireAll(rgb).forEach((item, index) => {
            this.load.image(rgb.keys()[index].split('/')[1], item.default)
        });

        console.log('sc', scene);

    }
    create() {
        const scene = this;
        this.add.text(1024 / 2, 100, 'apacitor-updater 3.0.0').setOrigin(0.5);

        const btn = scene.add.container(1024 / 2, 300);
        const rect = scene.add.rectangle(0, 0, 150, 100, 0xfff, 0.5);
        const text = this.add.text(0, 0, 'reset').setOrigin(0.5);
        btn.add([rect, text])
        btn.setSize(150, 100).setInteractive({
            useHandCursor: true
        });
        btn.on('pointerup', function () {
            updateNow();
        })

        var arr = ['img_002', 'img_004', 'img_152', 'img_154', 'img_155', 'img_287', 'img_359', 'img_366',
            'img_927', 'img_931', 'img_933'
        ]

        arr.forEach((item, index) => {
            scene.add.image(50 + 90 * index, 500, item + '.jpg').setScale(0.4);
        });
    }
}


