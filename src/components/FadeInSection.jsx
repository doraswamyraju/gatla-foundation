import React, { useState, useEffect, useRef } from 'react';

const FadeInSection = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Optional: Stop observing once visible to run animation only once
                    if (domRef.current) observer.unobserve(domRef.current);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of component is visible
            rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
        });

        const currentRef = domRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default FadeInSection;
