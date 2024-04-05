import { CSSProperties, ReactNode } from 'react';

interface ListProps<T> {
    list: Array<T>;
    renderItem: (item: T, index: number) => ReactNode;
    listBlockClassname?: string;
    listItemClassname?: string;
    stylesListBlock?: CSSProperties;
    stylesListItem?: CSSProperties;
    withoutParents?: boolean
}

function List<T>(props: ListProps<T>) {
    const {
        list,
        renderItem,
        stylesListBlock,
        withoutParents,
        stylesListItem,
        listItemClassname,
        listBlockClassname,
    } = props;
    if(withoutParents) {
        return (
            <>
                {
                    list.map((item, index) => renderItem(item, index))
                }
            </>
        )
    }
    return (
        <div className={listBlockClassname} style={stylesListBlock}>
            {list.map((item, index) => (
                <div className={listItemClassname} style={stylesListItem} key={index}>
                    {renderItem(item, index)}
                </div>
            ))}
        </div>
    );
}

export default List;
