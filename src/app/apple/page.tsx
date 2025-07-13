"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const imageFiles = [
	{
		small: 'promo_airpods_4_avail__bl22kvpg6ez6_medium_2x.jpg',
		large: 'promo_airpods_4_avail__bl22kvpg6ez6_large_2x.jpg',
		headline: 'AirPods Pro',
		subhead: 'เสียงที่เหนือกว่า',
		cta: { more: '#', buy: '#' },
		position: 'bottom'
	},
	{
		small: 'promo_apple_watch_series_10_avail_lte__c70y29goir42_medium.jpg',
		large: 'promo_apple_watch_series_10_avail_lte__c70y29goir42_large_2x.jpg',
		headline: 'Apple Watch Series 10',
		subhead: 'สุขภาพที่ดีขึ้น',
		cta: { more: '#', buy: '#' },
		position: 'top'
	},
	{
		small: 'promo_ipadpro_avail__s271j89g8kii_medium.jpg',
		large: 'promo_ipadpro_avail__s271j89g8kii_large_2x.jpg',
		headline: 'iPad Pro',
		subhead: 'ทรงพลังที่สุด',
		cta: { more: '#', buy: '#' },
		position: 'top'
	},
	{
		small: 'promo_macbookpro_announce__gdf98j6tj2ie_medium.jpg',
		large: 'promo_macbookpro_announce__gdf98j6tj2ie_large_2x.jpg',
		headline: 'MacBook Pro',
		subhead: 'เร็วและแรง',
		cta: { more: '#', buy: '#' },
		position: 'top'
	},
	{
		small: 'promo_ipad_air__bfbxzvw65c02_medium.jpg',
		large: 'promo_ipad_air__bfbxzvw65c02_large_2x.jpg',
		headline: 'iPad Air',
		subhead: 'เบาและบาง',
		cta: { more: '#', buy: '#' },
		position: 'top'
	},
	{
		small: 'promo_wwdc25_os__fag35zt85taq_medium.jpg',
		large: 'promo_wwdc25_os__fag35zt85taq_large_2x.jpg',
		headline: 'WWDC 2025',
		subhead: 'พบกับเทคโนโลยีใหม่',
		cta: { more: '#', buy: '#' },
		position: 'bottom'
	}
];

function AppleImageGrid() {
	const [isLarge, setIsLarge] = useState(false);

	useEffect(() => {
		const checkScreen = () => setIsLarge(window.innerWidth > 1068);
		checkScreen();
		window.addEventListener("resize", checkScreen);
		return () => window.removeEventListener("resize", checkScreen);
	}, []);

	return (
		<div className="p-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
				{imageFiles.map((img, idx) => {
					const src = isLarge
						? `/apple/large/${img.large}`
						: `/apple/small/${img.small}`;
					const imageClass =
						img.headline === 'iPad Air'
							? 'object-cover object-center !h-[580px]'
							: 'object-cover !h-[580px]';
					const justifyClass = img.position === 'top' ? 'justify-start' : 'justify-end';
					return (
						<div key={src} className="relative overflow-hidden shadow-lg w-full flex items-center justify-center h-[580px]">
							<Image
								src={src}
								alt={`Apple Image ${idx + 1}`}
								width={1268}
								height={580}
								className={imageClass}
								sizes="1268px"
								priority={idx === 0}
							/>
							<div className={`absolute inset-0 flex flex-col ${justifyClass} items-center p-8 pb-[53px] bg-gradient-to-t from-black/70 via-black/40 to-transparent`}>
								<h3 className="text-white font-bold mb-2 text-center" style={{fontSize: 40}}>{img.headline}</h3>
								<div className="text-white mb-4 text-center" style={{fontSize: 21}}>{img.subhead}</div>
								<div className="flex gap-3 justify-center w-full">
									<a
										href={img.cta.more}
										className="min-w-[30px] px-4 py-2 rounded text-white hover:bg-blue-600 transition"
										style={{ backgroundColor: '#0071e3', fontSize: 14, fontWeight: 400 }}
									>ดูเพิ่มเติม</a>
									<a
										href={img.cta.buy}
										className="min-w-[30px] px-4 py-2 rounded text-white border border-white"
										style={{ backgroundColor: 'transparent', fontSize: 14, fontWeight: 400 }}
									>ซื้อ</a>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default function ApplePage() {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center py-12">
			<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🍏 Apple Page</h1>
			<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
				This is a new page at <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">/apple</code>
			</p>
			{/* @ts-expect-error Server Component importing Client Component */}
			<AppleImageGrid />
		</div>
	);
}

export const dynamic = "force-dynamic";
