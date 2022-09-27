import type {NextPage} from 'next'
import Head from "next/head";
import {Container} from "react-bootstrap";
import Toolbar from "../components/toolbar/toolbar";
import UsersTable from "../components/usersTable/usersTable";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Fake users</title>
            </Head>
            <Container className="mt-3">
                <Toolbar/>
                <UsersTable className="mt-3" bordered hover striped/>
            </Container>
        </>
    )
}

export default Home
