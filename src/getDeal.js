const { SocksProxyAgent } = require("socks-proxy-agent");
const axios = require("axios");
const cheerio = require("cheerio");
const { convert } = require("html-to-text");

async function getDeal(url, options) {
    let reqOptions = {
        method: "GET",
        url,
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

    if (!data?.data || data?.status != 200) {
        console.error(data);
        throw new Error("Could not get page");
    }

    const $ = cheerio.load(data.data); // Parse DOM
    const script = $("script:last").html();
    const match = script.match(/window\.__INITIAL_STATE__\s*=\s*({.*?});/s);

    if (!match || !match[1]) {
        console.error(script);
        throw new Error("Could not parse page");
    }

    let json;
    try {
        json = JSON.parse(match[1]);
    } catch (e) {
        console.error(match[1]);
        throw new Error("Could not parse page");
    }

    if (!json.threadDetail) {
        console.error(json);
        throw new Error("Could not parse page");
    }
    json = json.threadDetail;

    if (options?.raw) {
        return json;
    } else {
        return { // Map Values
            id: parseInt(json.threadId),
            title: json.title,
            description: json.threadDetails?.preparedHtmlDescription,
            descriptionText: json.threadDetails?.preparedHtmlDescription ? convert(json.threadDetails.preparedHtmlDescription, { wordwrap: null }) : undefined,
            url: json.titleSlug && json.threadId ? `https://www.mydealz.de/deals/${json.titleSlug}-${json.threadId}` : undefined,
            shareUrl: json.shareableLink,

            status: json.status,
            createdAt: json.createdAt,
            publishedAt: json.publishedAt,
            updatedAt: json.updatedAt,

            temperature: json.temperature,
            temperatureLevel: json.temperatureLevel,

            commentCount: json.commentCount,

            startDate: json.startDate?.timestamp,
            endDate: json.endDate?.timestamp,

            link: json.link,
            voucherCode: json.voucherCode,

            merchant: {
                id: json.merchant?.merchantId ? parseInt(json.merchant?.merchantId) : undefined,
                name: json.merchant?.merchantName,
                url: json.merchant?.merchantId ? `https://www.mydealz.de/search/deals?merchant-id=${json.merchant?.merchantId}` : undefined,
                avatar: json.merchant?.avatar?.path && json.merchant?.avatar?.name ? `https://static.mydealz.de/${json.merchant.avatar.path}/${json.merchant.avatar.name}` : undefined
            },

            groups: json.groups?.map(group => ({
                id: parseInt(group.threadGroupId),
                name: group.threadGroupName,
                url: group.threadGroupUrlName ? `https://www.mydealz.de/gruppe/${group.threadGroupUrlName}` : undefined
            })),

            image: json.mainImage?.path && json.mainImage?.name ? `https://static.mydealz.de/${json.mainImage.path}/${json.mainImage.name}` : undefined,

            price: json.price,
            nextBestPrice: json.nextBestPrice,
            percentage: json.percentage,

            shipping: {
                isFree: json.shipping.isFree == 1 ? true : false,
                price: json.shipping.price
            },

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
            isExclusive: json.isExclusive,

            isVoucherCodeHidden: json.isVoucherCodeHidden,

            user: {
                id: parseInt(json.user.userId),
                name: json.user.username,
                createdAt: json.user.createdAt,
                avatar: json.user.avatar?.path && json.user.avatar?.name ? `https://static.mydealz.de/${json.user.avatar.path}/${json.user.avatar.name}` : undefined,
                url: json.user.username ? `https://www.mydealz.de/profile/${json.user.username}` : undefined,
                likeCount: json.user.likeCount,
                threadCount: json.user.threadCount,
                isUserProfileHidden: json.user.isUserProfileHidden,
                isDeletedOrPendingDeletion: json.user.isDeletedOrPendingDeletion,
                isBanned: json.user.isBanned,
            }
        };
    }
}

module.exports = getDeal;