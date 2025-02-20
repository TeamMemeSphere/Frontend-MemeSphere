import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = ({
    observerRef,
    fetchNextPage,
    hasNextPage,
    setPrevHeight,
    isFetching,
    chatListRef,
    chatList
}: {
    observerRef: any;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    setPrevHeight: (height: number) => void;
    isFetching: boolean;
    chatListRef: any;
    chatList: any;
}) => {

    const [isFetchingState, setIsFetchingState] = useState(isFetching);

    useEffect(() => {
        setIsFetchingState(isFetching);
    }, [isFetching]);

    const onIntersection = (entries: any[]) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasNextPage && !isFetchingState) {
            fetchNextPage();
        }
    }

    useEffect(() => {
        if (observerRef?.current) {
            const observer = new IntersectionObserver(onIntersection);
            if (observerRef.current) {
                observer.observe(observerRef.current);
            }
            return () => {
                if (observerRef.current) {
                    observer.disconnect();
                    observer.unobserve(observerRef.current);
                }
                if (chatListRef.current) {
                    setTimeout(() => {
                        setPrevHeight(chatListRef.current?.scrollHeight ?? 0);
                    }, 0);
                }
            };
        }

    }, [chatList]);

}

export default useIntersectionObserver;