import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import { parse } from 'node-html-parser';




export const POST =async(req:NextRequest)=>{
    try {

        console.log("Executinnggg get");
        const reqBody = await req.json();
        const {url} = reqBody;
        console.log("URLLL",url);
        const response = await fetch(url);
        if(!response)return NextResponse.json({
            // error:"Data not found"
        }, {status:200});


        const html = await response.text();
        const root = parse(html);

        // Extract title
        const title = root.querySelector('title').text.trim();

        // Extract description meta tag
        let description = '';
        const descriptionElement = root.querySelector('meta[name="description"]');
        if (descriptionElement) {
            description = descriptionElement.getAttribute('content').trim();
        }

        // Extract thumbnail URL from Open Graph meta tag
        let thumbnailUrl = '';
        let thumbnailWidth = '';
        let thumbnailHeight = '';
        const ogImageElement = root.querySelector('meta[property="og:image"]');
        if (ogImageElement) {
            thumbnailUrl = ogImageElement.getAttribute('content').trim();
            thumbnailWidth = ogImageElement.getAttribute('width') || '';
            thumbnailHeight = ogImageElement.getAttribute('height') || '';
        }

        let serviceName = '';
        const ogSiteNameElement = root.querySelector('meta[property="og:site_name"]');
        if (ogSiteNameElement) {
            serviceName = ogSiteNameElement.getAttribute('content').trim();
        }

        // Extract service URL from Open Graph meta tag
        let serviceUrl = '';
        const ogUrlElement = root.querySelector('meta[property="og:url"]');
        if (ogUrlElement) {
            serviceUrl = ogUrlElement.getAttribute('content').trim();
        }

        let anchorName = '';
        let anchorLink = '';
        const ogVideoTitleElement = root.querySelector('meta[property="og:title"]');
        if (ogVideoTitleElement) {
            anchorName = ogVideoTitleElement.getAttribute('content').trim();
        }
        const ogVideoUrlElement = root.querySelector('meta[property="og:url"]');
        if (ogVideoUrlElement) {
            anchorLink = ogVideoUrlElement.getAttribute('content').trim();
        }
        let channelName;
        let youtubeLogo;
        let embedHtml;
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            // console.log(root);
            const channelNameElement = root.querySelector('meta[itemprop="channelName"]');
            channelName = channelNameElement ? channelNameElement.getAttribute('content').trim() : null;

            // Extract YouTube logo
            const logoElement = root.querySelector('.ytd-channel-name a img');
            youtubeLogo = logoElement ? logoElement.getAttribute('src').trim() : null;

            // Extract embed HTML
            
            const potentialEmbedElements = root.querySelectorAll('meta[property="og:video"]');
            for (let i = 0; i < potentialEmbedElements.length; i++) {
                const embedUrl = potentialEmbedElements[i].getAttribute('content').trim();
                if (embedUrl.includes('youtube.com/embed/') || embedUrl.includes('youtu.be')) {
                    embedHtml = `<iframe width="560" height="315" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
                    break; // Stop searching once we find a valid embed URL
                }
            }

        }else {
            const iframeElement = root.querySelector('iframe');
            embedHtml = iframeElement ? iframeElement.outerHTML : null;
        }



        const domain = (new URL(url)).hostname;

        console.log("Title::", title);
        console.log("Description::", description);
        console.log("Thumbnail:", thumbnailUrl)
        console.log("Service Name:", serviceName);
        console.log("ServiceUrl:", serviceUrl);
        console.log("Anchor Name:", anchorName);
        console.log("Anchor Link:", anchorLink);
        console.log("Domain:", domain);
        console.log("Iframe:", embedHtml);
        console.log("Channel Name:", channelName);
        console.log("youtube logo:", youtubeLogo);

        const attachements = {
            title,
            description,
            thumbnailUrl:youtubeLogo,
            thumbnailHeight,
            thumbnailWidth,
            serviceName,
            serviceUrl,
            anchorName,
            anchorLink,
            domain,
            embedHtml,
            channelName,
            videoThumbnail:thumbnailUrl
        }

        return NextResponse.json({
            attachments:attachements
        }, {status:200});


    } catch (error) {
        console.log(error);
    }
}