import React, {Component} from 'react';
import Layout from "../../components/layout";
import {Form, Button, Input, Message} from "semantic-ui-react";
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import {Router} from "../../routes";

class CampaignNew extends Component {
    state = {
        mimimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.mimimumContribution).send({
                    from: accounts[0]
                });

            Router.pushRoute('/');

        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <Input
                            label='wei'
                            labelPosition="right"
                            value={this.state.mimimumContribution}
                            onChange={event => this.setState({mimimumContribution: event.target.value})}
                        />
                    </Form.Field>

                    <Message error header="oops" content={this.state.errorMessage} />

                    <Button
                        content="Create"
                        primary
                        loading={!!this.state.loading}
                        disabled={!!this.state.loading}
                    />

                </Form>

            </Layout>
        )
    }
}

export default CampaignNew;
