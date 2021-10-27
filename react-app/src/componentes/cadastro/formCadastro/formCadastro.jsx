import './formCadastro.css';
import { Form, Button, Col, Row} from 'react-bootstrap'

export default function FormCadastro() {

  return (
    <div className="fromCadastro">
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3 fromInput" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Nome" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 fromInput" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3 fromInput" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Senha" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 fromInput" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Repetir senha" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="BtnCadastro">
          Confirmar
        </Button>
    </Form>
    </div>
  )}