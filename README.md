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
  - [Disclaimer](#disclaimer)
  - [License](#license)

## Installation

`npm install github:TalkLounge/mydealz-api`

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
        currentUserVoteDirection: undefined,
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
                name: '199_3',
                ext: 'raw',
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
            name: '2471207_1',
            ext: 'jpg',
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
        isBookmarked: false,
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
        claimCodeCampaign: { id: null, name: null },
        user: {
            id: 2148223,
            name: 'Waffelwurst101',
            avatar: {
                url: 'https://static.mydealz.de/users/raw/default/2148223_53.jpg',
                urlSmall: 'https://static.mydealz.de/users/raw/default/2148223_53/fi/60x60/qt/45/2148223_53.jpg',
                name: '2148223_53',
                ext: 'jpg',
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
    proxyUrl?: string // Supports HTTP(s) and Socks Proxies, Datacenter IPs are blocked on MyDealz, e.g. "https://user:password@proxy.com:443"
}
```

## Disclaimer

This API is inofficial, so it might break at any time. Use it on your own risk! Don't use it in production!

Scraping may be against the TOS

I'm not affiliated with MyDealz or the 6Minutes Media GmbH

## License

MIT