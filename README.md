# MyDealz API (Inofficial)

Inofficial [MyDealz.de](https://www.mydealz.de) API Module for Node.js

## Table of Contents
- [MyDealz API (Inofficial)](#mydealz-api-inofficial)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [API](#api)
    - [Import](#import)
    - [Get new Deals](#get-new-deals)
      - [Parameters](#parameters)
    - [Get Deal](#get-deal)
      - [Parameters](#parameters-1)
  - [Disclaimer](#disclaimer)
  - [License](#license)

## Installation

```
npm install github:TalkLounge/mydealz-api`
```

## API

### Import

```js
const mydealzApi = require("mydealz-api");

// or

import * as mydealzApi from "mydealz-api";
```

### Get new Deals

```js
const newDeals = await mydealzApi.getNewDeals(); // Gets first page of https://www.mydealz.de/new as json

console.log(newDeals);

/*
[
    {
        id: 2471207,
        title: 'Samsung GQ85QN94DATXZG AI Neo QLED TV 85 Zoll (214 cm) + Galaxy Z Flip 6 + (1000,- C.back zusä. bei Soundbarkauf) eff.~1149 Exp.Rangsdorf',
        url: 'https://www.mydealz.de/deals/samsung-gq85qn94datxzg-ai-neo-qled-tv-85-zoll-214-cm-galaxy-z-flip-6-1000-cback-zusa-bei-soundbarkauf-eff-1299-expert-bautzen-2471207',
        shareUrl: 'https://www.mydealz.de/share-deal/2471207',
        status: 'Activated',
        publishedAt: 1732566995,
        temperature: 189.83,
        temperatureLevel: 'Hot2',
        commentCount: 60,
        startDate: undefined,
        endDate: undefined,
        link: 'https://www.expert.de/shop/unsere-produkte/tv-audio/fernseher/lcd-led-fernseher/11128807771-gq85qn94datxzg-neo-qled-tv.html',
        voucherCode: '-400 Direktabzug',
        merchant: {
            id: 199,
            name: 'expert',
            url: 'https://www.mydealz.de/search/deals?merchant-id=199',
            avatar: {
                url: 'https://static.mydealz.de/merchants/raw/avatar/199_3.raw',
                width: 0,
                height: 0
            }
        },
        group: {
            id: 2,
            name: 'Elektronik',
            url: 'https://www.mydealz.de/gruppe/elektronik'
        },
        image: {
            url: 'https://static.mydealz.de/threads/raw/2uG9s/2471207_1.jpg',
            urlSmall: 'https://static.mydealz.de/threads/raw/2uG9s/2471207_1/re/300x300/qt/60/2471207_1.jpg',
            width: 1220,
            height: 1647
        },
        price: 2654.05,
        nextBestPrice: 2999,
        percentage: 0,
        shipping: { isFree: false, price: 0 },
        isNsfw: false,
        isExpired: false,
        isNew: false,
        isPinned: false,
        pinId: null,
        isTrending: null,
        isLocal: false,
        canVote: false,
        isAffiliateTrackingDisabled: false,
        isAffiliateDescriptionDisabled: false,
        isLocked: false,
        contentLockedBy: null,
        isEditLocked: false,
        isExpireLocked: false,
        isSpamLocked: false,
        deletedAt: null,
        isNewsletterPicked: null,
        isCommentsModerationOn: null,
        isCommunityFavorite: false,
        isCategoryCommunityFavorite: false,
        isTopDeal: false,
        isCategoryTopDeal: false,
        isExclusive: false,
        user: {
            id: 2148223,
            name: 'Waffelwurst101',
            avatar: {
                url: 'https://static.mydealz.de/users/raw/default/2148223_53.jpg',
                urlSmall: 'https://static.mydealz.de/users/raw/default/2148223_53/fi/60x60/qt/45/2148223_53.jpg',
                width: 0,
                height: 0
            },
            isUserProfileHidden: false,
            isDeletedOrPendingDeletion: false,
            isBanned: false
        }
    },
    ...
    ...
    ...
]
*/
```

#### Parameters

The function getNewDeals(page, options) takes the following parameters
```js
page?: number // Default: 1

options?: {
    proxyUrl?: string, // Supports HTTP(s) and Socks Proxies (Datacenter IPs are blocked on MyDealz) e.g. "https://user:password@proxy.com:443"
    raw?: boolean // Return Raw(Unmapped) JSON instead
}
```

### Get Deal

```js
const deal = await mydealzApi.getDeal("https://www.mydealz.de/deals/samsung-gq85qn94datxzg-ai-neo-qled-tv-85-zoll-214-cm-galaxy-z-flip-6-1000-cback-zusa-bei-soundbarkauf-eff-1299-expert-bautzen-2471207");

console.log(deal);

/*
{
    id: 2471207,
    title: 'Samsung GQ85QN94DATXZG AI Neo QLED TV 85 Zoll (214 cm) + Galaxy Z Flip 6 + (1000,- C.back zusä. bei Soundbarkauf) eff.~1149 Exp.Rangsdorf',
    description: '@BAB2583 vielen Dank für den und auch vorherige hilfreiche Tipps  <i class="emoji emoji--type-happy" title=":D"></i><br /><br />Expert u.a Bautzen,Zeesen, Rangsdorf, Bautzen oder ESC Berlin<br /><br />2,5 Topcashback nicht vergessen <br /><br />für effektiv Preis kommentare zum Abgelaufenen Deal lesen. Wer nur die 1000 Euro cashback möchte z.b Die samsung HW- S710GD/ZG oder HW- S711 GD/ZG dazu kaufen, gibt es oft unter 300,-<br /><br /><a href="https://www.mydealz.de/share-deal-from-app/2450012" class="link">mydealz.de/share-deal-from-app/2450012</a><br /><br /><br />Bei Expert/Samsung gibt es beim kauf des Samsung Qn94 D ein Samsung Galaxy Z Flip 256 GB Gratis dazu<br />Bei einer in der Samsung Aktion gelisteten Soundbar zusätzlich bis zu 1000 Euro Cashback. Muss man aber nicht direkt gleichzeitig kaufen<br /><br /><img src="https://static.mydealz.de/threads/raw/ZoBIn/2471207_1/fs/895x577/qt/65/2471207_1.jpg" data-width="632" data-height="577" data-image="2471207-ZoBIn" data-alignment="-" alt="2471207_1.jpg" /><br /><img src="https://static.mydealz.de/threads/raw/tmxeb/2471207_1/fs/895x577/qt/65/2471207_1.jpg" data-width="895" data-height="393" data-image="2471207-tmxeb" data-alignment="-" alt="2471207_1.jpg" /><br /><br /><ul><li>Neo QLED-TV mit 85 Zoll / 214 cm Bildschirmdiagonale</li><li>4K Ultra HD mit 3840 x 2160 Pixel</li><li>AI Upscaling, HLG, Ultimate UHD Dimming Pro, Neural Quantum Prozessor 4K</li><li>HD Twin Triple Tuner: DVB-C, DVB-S2, DVB-T2HD</li><li>144 Hz, HDR, HDR 10+, USB-Aufnahme</li><li>Smart TV, Sprachsteuerung (Bixby) / kompatibel mit Amazon Alexa, DLNA</li><li>Vesa-Norm: 600 x 400</li><li>4x HDMI, 2x USB, Cl+-Modul (1.4), WLAN, Bluetooth</li><li>Abmessungen (BxHxT): ca. 189,2 x 114,3 x 32,1 cm mit Fuß</li><li>Lieferumfang (Zubehör): Fernbedienung,
    Standfuß, Anleitung, Stromkabel</li></ul>',
    descriptionText: '@BAB2583 vielen Dank für den und auch vorherige hilfreiche Tipps\n' +
    '\n' +
    'Expert u.a Bautzen,Zeesen, Rangsdorf, Bautzen oder ESC Berlin\n' +
    '\n' +
    '2,5 Topcashback nicht vergessen\n' +
    '\n' +
    'für effektiv Preis kommentare zum Abgelaufenen Deal lesen. Wer nur die 1000 Euro cashback möchte z.b Die samsung HW- S710GD/ZG oder HW- S711 GD/ZG dazu kaufen, gibt es oft unter 300,-\n' +
    '\n' +
    'mydealz.de/share-deal-from-app/2450012 [https://www.mydealz.de/share-deal-from-app/2450012]\n' +
    '\n' +
    '\n' +
    'Bei Expert/Samsung gibt es beim kauf des Samsung Qn94 D ein Samsung Galaxy Z Flip 256 GB Gratis dazu\n' +
    'Bei einer in der Samsung Aktion gelisteten Soundbar zusätzlich bis zu 1000 Euro Cashback. Muss man aber nicht direkt gleichzeitig kaufen\n' +
    '\n' +
    '2471207_1.jpg [https://static.mydealz.de/threads/raw/ZoBIn/2471207_1/fs/895x577/qt/65/2471207_1.jpg]\n' +
    '2471207_1.jpg [https://static.mydealz.de/threads/raw/tmxeb/2471207_1/fs/895x577/qt/65/2471207_1.jpg]\n' +
    '\n' +
    '\n' +
    ' * Neo QLED-TV mit 85 Zoll / 214 cm Bildschirmdiagonale\n' +
    ' * 4K Ultra HD mit 3840 x 2160 Pixel\n' +
    ' * AI Upscaling, HLG, Ultimate UHD Dimming Pro, Neural Quantum Prozessor 4K\n' +
    ' * HD Twin Triple Tuner: DVB-C, DVB-S2, DVB-T2HD\n' +
    ' * 144 Hz, HDR, HDR 10+, USB-Aufnahme\n' +
    ' * Smart TV, Sprachsteuerung (Bixby) / kompatibel mit Amazon Alexa, DLNA\n' +
    ' * Vesa-Norm: 600 x 400\n' +
    ' * 4x HDMI, 2x USB, Cl+-Modul (1.4), WLAN, Bluetooth\n' +
    ' * Abmessungen (BxHxT): ca. 189,2 x 114,3 x 32,1 cm mit Fuß\n' +
    ' * Lieferumfang (Zubehör): Fernbedienung, Standfuß, Anleitung, Stromkabel',
    url: 'https://www.mydealz.de/deals/samsung-gq85qn94datxzg-ai-neo-qled-tv-85-zoll-214-cm-galaxy-z-flip-6-1000-cback-zusa-bei-soundbarkauf-eff-1299-expert-bautzen-2471207',
    shareUrl: 'https://www.mydealz.de/share-deal/2471207',
    status: 'Activated',
    createdAt: 1732469391,
    publishedAt: 1732566995,
    updatedAt: 1732573707,
    temperature: 261.33,
    temperatureLevel: 'Hot3',
    commentCount: 106,
    startDate: 0,
    endDate: 1732573707,
    link: 'https://www.expert.de/shop/unsere-produkte/tv-audio/fernseher/lcd-led-fernseher/11128807771-gq85qn94datxzg-neo-qled-tv.html',
    voucherCode: '-400 Direktabzug',
    merchant: {
        id: 199,
        name: 'expert',
        url: 'https://www.mydealz.de/search/deals?merchant-id=199',
        avatar: 'https://static.mydealz.de/merchants/raw/avatar/199_3'
    },
    groups: [
        {
            id: 2,
            name: 'Elektronik',
            url: 'https://www.mydealz.de/gruppe/elektronik'
        },
        {
            id: 43,
            name: 'Fernseher',
            url: 'https://www.mydealz.de/gruppe/fernseher'
        },
        {
            id: 47,
            name: 'Samsung Fernseher',
            url: 'https://www.mydealz.de/gruppe/samsung-fernseher'
        },
        {
            id: 218,
            name: 'Samsung',
            url: 'https://www.mydealz.de/gruppe/samsung'
        },
        {
            id: 1242,
            name: 'TV & Video',
            url: 'https://www.mydealz.de/gruppe/tv-video'
        }
    ],
    image: 'https://static.mydealz.de/threads/raw/2uG9s/2471207_1',
    price: 2654.05,
    nextBestPrice: 2999,
    percentage: 0,
    shipping: { isFree: false, price: null },
    isExpired: true,
    isNew: false,
    isPinned: false,
    pinId: 0,
    isTrending: false,
    isLocal: false,
    canVote: false,
    isAffiliateTrackingDisabled: false,
    isAffiliateDescriptionDisabled: false,
    isLocked: false,
    contentLockedBy: '',
    isEditLocked: false,
    isExpireLocked: false,
    isSpamLocked: false,
    deletedAt: null,
    isNewsletterPicked: false,
    isCommentsModerationOn: false,
    isPushed: false,
    isExclusive: false,
    isVoucherCodeHidden: false,
    user: {
        id: 2148223,
        name: 'Waffelwurst101',
        createdAt: 1654514841,
        avatar: 'https://static.mydealz.de/users/raw/default/2148223_53',
        url: 'https://www.mydealz.de/profile/Waffelwurst101',
        likeCount: 5719,
        threadCount: 276,
        isUserProfileHidden: false,
        isDeletedOrPendingDeletion: false,
        isBanned: false
    }
}
*/
```

#### Parameters

The function getDeal(url, options) takes the following parameters
```js
url: string

options?: {
    proxyUrl?: string, // Supports HTTP(s) and Socks Proxies (Datacenter IPs are blocked on MyDealz) e.g. "https://user:password@proxy.com:443"
    raw?: boolean // Return Raw(Unmapped) JSON instead
}
```

## Disclaimer

This API is inofficial, so it might break at any time. Use it on your own risk! Don't use it in production!

Scraping may be against the TOS

I'm not affiliated with MyDealz or the 6Minutes Media GmbH

## License

MIT