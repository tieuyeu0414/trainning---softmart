import React, { useState, useEffect } from 'react'
import * as filters from './filter';
import './SSTree.css';
import PropTypes from 'prop-types'

const TreeContext = React.createContext({});

export const SSTree = (props: any) => {
    const [data, setData] = useState(props.data || [])
    const [selected, setSelect] = useState<any>(null);

    useEffect(() => {
        if (props.filter && data.length > 0) {
            onFilter(props.filterData)
        }
    }, [props.filterData])

    useEffect(() => {
        setData(props.data);
    }, [props.data])

    useEffect(() => {
        if (selected) {
            props.onSelect(selected)
        }
    }, [selected])

    useEffect(() => {
        console.log(props.expandAll)
    }, [props.expandAll])

    function onFilter(value: any) {
        const filter = value ? value.trim() : '';
        if (!filter) {
            setData(props.data)
            // return 0;
        }
        let filtered = filters.filterTree(props.data, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        setData(filtered)
    }

    return (
        <>
            <ul className="flex_tree-cover flex_tree-ul" style={{ width: 500 }}>
                <TreeContext.Provider value={{ selected, setSelect }}>
                    {/* {props.header ? props.header(setSelect) : null} */}
                    {
                        data.map((node: any, index: any) => (
                            <LoadNode
                                data={node}
                                level={1}
                                expandAll={props.expandAll}
                                key={index.toString()}
                                ID={props.ID}
                                Label={props.Label}
                            />
                        ))
                    }
                    {/* {props.footer ? props.footer(setSelect) : null} */}
                </TreeContext.Provider>
            </ul>
        </>
    )
}

SSTree.propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func,
    filter: PropTypes.bool,
    filterData: PropTypes.string,
    expandAll: PropTypes.bool,
    header: PropTypes.node,
    footer: PropTypes.node,
    ID: PropTypes.string,
    Label: PropTypes.string,
}

SSTree.defaultProps = {
    filter: false,
    expandAll: true,
}

const loadLeaf = (children: any, level: number, expandAll: boolean, ID: string, Label: string) => {
    return (
        <ul className="flex_tree-ul" style={{ marginLeft: level * 10 }}>
            {children?.map((node: any, index: number) =>
                <LoadNode
                    data={node}
                    key={index}
                    level={level + 1}
                    expandAll={expandAll}
                    ID={ID}
                    Label={Label}
                />)}
        </ul>
    )
}

const LoadNode = (props: any) => {
    const [toggle, setToggle] = useState(props.data.toggle ? true : false);
    const hasChild = props.data?.children?.length > 0

    useEffect(() => {
        setToggle(props.expandAll)
    }, [props.expandAll])

    function toggleNode() {
        setToggle(!toggle)
    }

    return (
        <>
            <TreeContext.Consumer>
                {(context: any) => {
                    return (
                        <>
                            <li style={{ ...styles.treeNode }}>
                                {hasChild ?
                                    <a style={styles.toggle} onClick={toggleNode}>
                                        {
                                            toggle
                                                ? <i className="pi pi-minus" style={{ fontSize: '11px' }} />
                                                : <i className="pi pi-plus" style={{ fontSize: '11px' }} />
                                        }
                                    </a>
                                    : null}
                                {/* <div style={styles.checkBox}>Check box</div> */}
                                <span onClick={() => context.setSelect(props.data)} className={context.selected?.[props.ID] === props.data?.[props.ID] ? 'flex_tree-selected-node' : ''}>{props.data?.[props.Label]}</span>
                            </li>
                            {toggle ? loadLeaf(props.data?.children, props.level, props.expandAll, props.ID, props.Label) : null}
                        </>
                    )
                }}
            </TreeContext.Consumer>
        </>
    )
}

const styles = {
    treeNode: {
        // display: 'flex',
        // cursor: 'pointer'
    },
    toggle: {
        marginRight: 5,
    },
    checkBox: {
        marginRight: 5,
    }
}
