import { useEffect } from 'react';

const useIntersectionObserver = ({
    observerRef,
    fetchNextPage,
    hasNextPage,
    setPrevHeight,
    chatListRef,
    chatList
}: {
    observerRef: any;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    setPrevHeight: (height: number) => void;
    chatListRef: any;
    chatList: any;
}) => {

    console.log("useIntersectionObserver 진입");
    // console.log(observerRef.current);

    const onIntersection = (entries: any[]) => {
        const firstEntry = entries[0];
        console.log(firstEntry); 
        console.log(hasNextPage);
        if (firstEntry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    } 

    useEffect(() => {
        console.log('useEffect 진입');
        if (observerRef && observerRef.current) {
            const observer = new IntersectionObserver(onIntersection, { threshold: 0.5 });
            if (observerRef.current) {
                observer.observe(observerRef.current);
                console.log(chatListRef.current);
                
            }
            return () => {
                if (observerRef.current){
                    observer.unobserve(observerRef.current);
                }
                if (chatListRef.current) {
                    console.log('아아아');
                    console.log(chatListRef.current.scrollHeight);
                    setPrevHeight(chatListRef.current?.scrollHeight ?? 0);
                }
            };
          }
      
        }, [chatList]);

}

export default useIntersectionObserver;