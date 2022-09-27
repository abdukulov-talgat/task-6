import React, {useContext, useEffect, useState} from 'react';
import {Button, Table} from "react-bootstrap";
import {SettingsContext} from "../../lib/settingsContext";
import {User} from "../../types/types";
import InfiniteScroll from "react-infinite-scroll-component";
import {fetchUsers} from "../../lib/http";
import {DEBOUNCE_TIMEOUT} from "../../lib/const";


const UsersTable = ({...props}) => {
    const [settings] = useContext(SettingsContext);
    const [page, setPage] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [timerId, setTimerId] = useState(0);

    const nextPage = async () => {
        setPage(page + 1);
        const fetchedUsers = await fetchUsers({...settings, page: page + 1});
        setUsers((prevState) => [...prevState, ...fetchedUsers]);
    }

    useEffect(() => {
        const initialLoad = () => {
            setPage(0);
            fetchUsers({...settings, page: 0}).then(
                (fetchedUsers) => setUsers(fetchedUsers)
            );
        }
        clearTimeout(timerId);
        setTimerId(window.setTimeout(initialLoad, DEBOUNCE_TIMEOUT));
    }, [settings])

    return (
        <>
            <div className="d-flex gap-3 pt-3 justify-content-center align-items-center">
                <div className="page-counter">Pages: {page + 1}</div>
                <Button as="a"
                    href={`/api/save?page=${page}&errors=${settings.errors}&seed=${settings.seed}&region=${settings.region}`}
                   download>
                    Export to CSV
                </Button>
            </div>
            <InfiniteScroll
                dataLength={users.length}
                next={nextPage}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollThreshold={1}
            >
                <Table {...props} responsive>
                    <thead>
                    <tr>
                        <th style={{width: '5%'}}>#</th>
                        <th style={{width: '15%'}}>ID</th>
                        <th style={{width: '20%'}}>Full name</th>
                        <th style={{width: '40%'}}>Address</th>
                        <th style={{width: '20%'}}>Phone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((it, index) => (
                            <tr key={it.id}>
                                <td>{(index + 1)}</td>
                                <td>{it.id}</td>
                                <td>{it.fullName}</td>
                                <td>{it.address}</td>
                                <td>{it.phone}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </InfiniteScroll>
        </>
    );
};

export default UsersTable;
