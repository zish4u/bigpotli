// Google and Meta Tracking Events

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const trackPageView = (url: string) => {
    // console.log(`[Analytics] Page View: ${url}`);
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'PageView');
    }
};

export const trackEvent = (action: string, params: any) => {
    // console.log(`[Analytics] Event: ${action}`, params);
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, params);
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', action, params);
    }
};

// Conversion Specific Events
export const trackAddToCart = (product: any) => {
    trackEvent('AddToCart', {
        content_name: product.name,
        content_category: product.category,
        content_ids: [product.id.toString()],
        content_type: 'product',
        value: parseFloat(product.price.replace(/[^\d]/g, "")),
        currency: 'INR'
    });
};

export const trackBeginCheckout = (cart: any[]) => {
    trackEvent('BeginCheckout', {
        content_ids: cart.map(i => i.id.toString()),
        content_type: 'product',
        value: cart.reduce((acc, item) => acc + (parseFloat(item.price.replace(/[^\d]/g, "")) * item.quantity), 0),
        currency: 'INR'
    });
};

export const trackPurchase = (orderId: string, value: number, items: any[]) => {
    trackEvent('Purchase', {
        transaction_id: orderId,
        value: value,
        currency: 'INR',
        content_ids: items.map(i => i.id.toString()),
        content_type: 'product'
    });
};
