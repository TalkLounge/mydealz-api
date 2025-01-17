const { SocksProxyAgent } = require("socks-proxy-agent");
const axios = require("axios");
const cheerio = require("cheerio");

async function getNewDeals(page, options) {
    if (typeof (page) == "object" || !page) {
        options = page;
        page = 1;
    }
    if (page < 1) {
        page = 1;
    }

    let reqOptions = {
        method: "GET",
        url: `https://www.mydealz.de/new?page=${page}&ajax=true&layout=text`,
        headers: {
            "Host": "www.mydealz.de",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "de,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Connection": "keep-alive"
        }
    }

    if (options?.proxyUrl) { // Configure Proxy
        const url = new URL(options.proxyUrl);

        if (url.protocol.startsWith("http")) {
            reqOptions.proxy = {
                protocol: url.protocol.slice(0, -1),
                host: url.host,
                port: url.port,
                auth: {
                    username: url.username,
                    password: url.password
                }
            };
        } else if (url.protocol.startsWith("socks")) {
            reqOptions.httpsAgent = new SocksProxyAgent(options.proxyUrl);
        }
    }

    let data;
    try {
        data = await axios(reqOptions); // Make Request
    } catch (e) {
        data = e;
    }

    if (!data.data?.data?.content || data?.status != 200) {
        const error = new Error("Could not get page");
        error.name = "MyDealzAPIError";
        error.context = { reqOptions };
        error.originalError = data;
        throw error;
    }
    data = data.data?.data?.content;

    const $ = cheerio.load(data); // Parse DOM
    let list = [];

    $("article").each(function (_, element) {
        let json = $(element).find("div").attr("data-vue2");

        if (!json) {
            return;
        }

        json = JSON.parse(json)?.props?.thread;

        if (!json) {
            return;
        }

        if (options?.raw) {
            list.push(json);
        } else {
            list.push({ // Map Values
                id: parseInt(json.threadId),
                title: json.title,
                url: json.titleSlug && json.threadId ? `https://www.mydealz.de/deals/${json.titleSlug}-${json.threadId}` : undefined,
                shareUrl: json.shareableLink,

                status: json.status,
                publishedAt: json.publishedAt,
                rePublishedAt: json.bumpedAt,

                temperature: json.temperature,
                temperatureLevel: json.temperatureLevel,

                commentCount: json.commentCount,

                startDate: json.startDate?.timestamp,
                endDate: json.endDate?.timestamp,

                link: json.link,
                voucherCode: json.voucherCode,

                merchant: {
                    id: json.merchant?.merchantId,
                    name: json.merchant?.merchantName,
                    url: json.merchant?.merchantId ? `https://www.mydealz.de/search/deals?merchant-id=${json.merchant.merchantId}` : undefined,
                    avatar: {
                        url: json.merchant?.avatar?.path && json.merchant?.avatar?.uid ? `https://static.mydealz.de/${json.merchant.avatar.path}/${json.merchant.avatar.uid}` : undefined,
                        width: json.merchant?.avatar?.width,
                        height: json.merchant?.avatar?.height
                    }
                },

                group: {
                    id: json.mainGroup.threadGroupId,
                    name: json.mainGroup.threadGroupName,
                    url: json.mainGroup.threadGroupUrlName ? `https://www.mydealz.de/gruppe/${json.mainGroup.threadGroupUrlName}` : undefined
                },

                image: {
                    url: json.mainImage?.path && json.mainImage?.uid ? `https://static.mydealz.de/${json.mainImage.path}/${json.mainImage.uid}` : undefined,
                    urlSmall: json.mainImage?.path && json.mainImage?.name && json.mainImage?.uid ? `https://static.mydealz.de/${json.mainImage.path}/${json.mainImage.name}/re/300x300/qt/60/${json.mainImage.uid}` : undefined,
                    width: json.mainImage?.width,
                    height: json.mainImage?.height
                },

                price: json.price,
                nextBestPrice: json.nextBestPrice,
                percentage: json.percentage,

                shipping: {
                    isFree: json.shipping.isFree == 1 ? true : false,
                    price: json.shipping.price
                },

                isNsfw: json.nsfw,
                isExpired: json.isExpired,
                isNew: json.isNew,
                isPinned: json.isPinned,
                pinId: json.pinId,
                isTrending: json.isTrending,
                isLocal: json.isLocal,

                canVote: json.canVote,

                isAffiliateTrackingDisabled: json.isAffiliateTrackingDisabled,
                isAffiliateDescriptionDisabled: json.isAffiliateDescriptionDisabled,

                isLocked: json.isLocked,
                contentLockedBy: json.contentLockedBy,
                isEditLocked: json.isEditLocked,
                isExpireLocked: json.isExpireLocked,
                isSpamLocked: json.isSpamLocked,
                deletedAt: json.deletedAt,

                isNewsletterPicked: json.isNewsletterPicked,
                isCommentsModerationOn: json.isCommentsModerationOn,
                isPushed: json.isPushed,
                isCommunityFavorite: json.isCommunityFavorite,
                isCategoryCommunityFavorite: json.isCategoryCommunityFavorite,
                isTopDeal: json.isTopDeal,
                isCategoryTopDeal: json.isCategoryTopDeal,
                isExclusive: json.isExclusive,

                isVoucherCodeHidden: json.isVoucherCodeHidden,

                user: {
                    id: json.user.userId,
                    name: json.user.username,
                    avatar: {
                        url: json.user.avatar?.path && json.user.avatar?.uid ? `https://static.mydealz.de/${json.user.avatar.path}/${json.user.avatar.uid}` : undefined,
                        urlSmall: json.user.avatar?.path && json.user.avatar?.name ? `https://static.mydealz.de/${json.user.avatar.path}/${json.user.avatar.name}/fi/60x60/qt/45/${json.user.avatar.name}.jpg` : undefined,
                        width: json.user.avatar?.width,
                        height: json.user.avatar?.height
                    },
                    isUserProfileHidden: json.user.isUserProfileHidden,
                    isDeletedOrPendingDeletion: json.user.isDeletedOrPendingDeletion,
                    isBanned: json.user.isBanned,
                }
            });
        }
    });

    list.sort((a, b) => b.publishedAt - a.publishedAt);

    return list;
}

module.exports = getNewDeals;