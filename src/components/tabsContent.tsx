import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UsersTable from "./usersTable";
import UserCreateModel from "./model/userCreateModel";

function TabsContent() {
    return (
        <Container>
            <Tabs
                defaultActiveKey="user"
                id="uncontrolled-tab-example"
                className="mb-3 mt-3"
            >
                <Tab eventKey="user" title="User">
                    <div className="d-flex">
                        <h3>Tab Users</h3>
                        <UserCreateModel />
                    </div>
                    <UsersTable />
                </Tab>
                <Tab eventKey="blog" title="Blog">
                    Tab content for Profile
                </Tab>
            </Tabs>
        </Container>
    );
}

export default TabsContent;
