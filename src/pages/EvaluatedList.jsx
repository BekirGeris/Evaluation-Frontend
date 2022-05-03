import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Grid, Icon, Menu, Table } from 'semantic-ui-react'
import EvaluatedService from '../services/EvaluatedService'

export default function EvaluatedList() {
  const [evaluatedList, setEvaluatedList] = useState([])

  useEffect(() => {
    let evaluatedService = new EvaluatedService()
      
        evaluatedService.getEvaluatedWithEvaluationId(Cookies.get("evaluationModelId")).then((result) => {
          if(result.data.success) {
            setEvaluatedList(result.data.data)
            toast.success(result.data.message)
          } else {
            toast.error(result.data.message)
          }
        })
  }, []);

  return (
      <div className="Table">
          <Grid>
              <Grid.Row>
                  <Grid.Column width={2}>

                  </Grid.Column>

                  <Grid.Column width={12}>
                      <Table celled>
                          <Table.Header>
                              <Table.Row>
                                  <Table.HeaderCell>Evaluated First Name</Table.HeaderCell>
                                  <Table.HeaderCell>Evaluated Last Name</Table.HeaderCell>
                                  <Table.HeaderCell>Evaluated Number</Table.HeaderCell>
                                  <Table.HeaderCell>Evaluated Point</Table.HeaderCell>
                              </Table.Row>
                          </Table.Header>


                          <Table.Body>
                              {
                                  evaluatedList.map(evaluated => (
                                      <Table.Row key={evaluated.evaluatedId}>
                                          <Table.Cell>{evaluated.evaluatedFirstName}</Table.Cell>
                                          <Table.Cell>{evaluated.evaluatedLastName}</Table.Cell>
                                          <Table.Cell>{evaluated.evaluatedNumber}</Table.Cell>
                                          <Table.Cell>{evaluated.evaluatedPoint}</Table.Cell>
                                      </Table.Row>
                                  ))
                              }
                          </Table.Body>

                          <Table.Footer>
                              <Table.Row>
                                  <Table.HeaderCell colSpan='8'>
                                      <Menu floated='right' pagination>
                                          <Menu.Item as='a' icon>
                                              <Icon name='chevron left' />
                                          </Menu.Item>
                                          <Menu.Item as='a'>1</Menu.Item>
                                          <Menu.Item as='a'>2</Menu.Item>
                                          <Menu.Item as='a'>3</Menu.Item>
                                          <Menu.Item as='a'>4</Menu.Item>
                                          <Menu.Item as='a' icon>
                                              <Icon name='chevron right' />
                                          </Menu.Item>
                                      </Menu>
                                  </Table.HeaderCell>
                              </Table.Row>
                          </Table.Footer>
                      </Table>
                  </Grid.Column>

                  <Grid.Column width={2}>

                  </Grid.Column>
              </Grid.Row>
          </Grid>
      </div>
  )
}
