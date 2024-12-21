import React, { useState } from 'react'
import { Container, InputGroup } from './styles'
import fundo from '../../assets/backGrounds/roxo-4.jpg'
import HeadlineScroll from '../../utils/SlideTitle'
import emailjs from '@emailjs/browser'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import wpp from '../../assets/images/wpp.png'
import gmail from '../../assets/images/gmail.png'
import linkedin from '../../assets/images/linkedin.png'
import github from '../../assets/tec/github.png'

const Contact = () => {
  const [toastId, setToastId] = useState<string | number | null>(null)

  const serviceId = process.env.REACT_APP_SERVICE_ID
  const templateId = process.env.REACT_APP_TEMPLATE_ID
  const publicKey = process.env.REACT_APP_PUBLIC_KEY

  const alertSuccess = () => {
    if (toastId === null) {
      const id = toast.success('Mensagem enviada com sucesso!', {
        containerId: 'contactToast',
        onClose: () => setToastId(null)
      })
      setToastId(id)
    }
  }

  const alertError = (message: string) => {
    if (toastId === null) {
      const id = toast.error(message, {
        containerId: 'contactToast',
        onClose: () => setToastId(null)
      })
      setToastId(id)
    }
  }

  const formatPhoneNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      .slice(0, 15)
  }

  const formatOnlyLetters = (value: string) => {
    return value.replace(/[^A-Za-zÀ-ÿ\s]/g, '')
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()

  //   const serviceID = 'service_c0x45ul'
  //   const templateID = 'template_ngkffsc'
  //   const publicKey = 'p7pkklRRtvzCLRTil'

  //   emailjs
  //     .send(serviceID, templateID, formData, publicKey)
  //     .then((response) => {
  //       console.log(
  //         'Email enviado com sucesso!',
  //         response.status,
  //         response.text
  //       )
  //       alert('Mensagem enviada com sucesso!')
  //       setFormData({ name: '', email: '', tel: '', message: '' })
  //     })
  //     .catch((error) => {
  //       console.error('Erro ao enviar email:', error)
  //       alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente.')
  //     })
  // }

  const formik = useFormik({
    initialValues: {
      name: '',
      tel: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'O nome precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      tel: Yup.string()
        .required('O campo é obrigatório')
        .matches(
          /^\(\d{2}\)\s\d{5}-\d{4}$/,
          'Digite um telefone válido com DDD'
        ),
      email: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      message: Yup.string().required('O campo é obrigatório')
    }),
    onSubmit: (values, { resetForm }) => {
      if (!serviceId || !templateId || !publicKey) {
        alertError(
          'Erro: as variáveis de ambiente não estão configuradas corretamente.'
        )
        return
      }

      emailjs
        .send(serviceId, templateId, values, publicKey)
        .then(() => {
          alertSuccess()
          resetForm()
        })
        .catch(() => {
          alertError('Ocorreu um erro ao enviar sua mensagem. Tente novamente.')
        })
    }
  })

  return (
    <Container id="contact">
      <ToastContainer containerId="contactToast" />
      <div className="background">
        <img src={fundo} alt="Fundo" />
      </div>
      <HeadlineScroll content="contato" height="26%" />
      <div className="contentWrapper">
        <div
          className="content"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="300"
        >
          <div className="socialMedias">
            <h1>Redes sociais</h1>

            <div className="mediaContainer">
              <div className="media">
                <a
                  href="https://wa.me/5519988481818"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={wpp} alt="" />
                </a>
              </div>

              <div className="media">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=cesarsantosdeveloper@gmail.com&su=Assunto&body=Mensagem"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={gmail} alt="" />
                </a>
              </div>
              <div className="media">
                <a
                  href="https://www.linkedin.com/in/cesar-santos-dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={linkedin} alt="" />
                </a>
              </div>
              <div className="media">
                <a
                  href="https://github.com/CesarSants"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={github} alt="" />
                </a>
              </div>
            </div>
          </div>
          <form className="form" onSubmit={formik.handleSubmit}>
            <InputGroup>
              <div className="group">
                <label htmlFor="name">Digite o seu nome:</label>
                <input
                  type="text"
                  id="name"
                  value={formik.values.name}
                  onChange={(e) =>
                    formik.setFieldValue(
                      'name',
                      formatOnlyLetters(e.target.value)
                    )
                  }
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.name && formik.touched.name ? 'error' : ''
                  }
                />
              </div>
              {formik.errors.name && formik.touched.name && (
                <small>{formik.errors.name}</small>
              )}
            </InputGroup>
            <InputGroup>
              <div className="group">
                <label htmlFor="email">Digite o seu E-mail: </label>
                <input
                  type="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.email && formik.touched.email ? 'error' : ''
                  }
                />
              </div>

              {formik.errors.email && formik.touched.email && (
                <small>{formik.errors.email}</small>
              )}
            </InputGroup>
            <InputGroup>
              <div className="group">
                <label htmlFor="tel">Digite o seu telefone:</label>
                <input
                  type="tel"
                  id="tel"
                  value={formik.values.tel}
                  onChange={(e) =>
                    formik.setFieldValue(
                      'tel',
                      formatPhoneNumber(e.target.value)
                    )
                  }
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.tel && formik.touched.tel ? 'error' : ''
                  }
                />
              </div>
              {formik.errors.tel && formik.touched.tel && (
                <small>{formik.errors.tel}</small>
              )}
            </InputGroup>
            <InputGroup>
              <div className="group">
                <label htmlFor="message">Mensagem:</label>
                <textarea
                  id="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.message && formik.touched.message
                      ? 'error'
                      : ''
                  }
                ></textarea>
              </div>
              {formik.errors.message && formik.touched.message && (
                <small>{formik.errors.message}</small>
              )}
            </InputGroup>
            <button className="cta" type="submit" rel="noreferrer">
              <span>Enviar</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </form>
        </div>
        <footer className="footer">
          <p>Todos os direitos reservados | Desenvolvido por Cesar Santos</p>
        </footer>
      </div>
    </Container>
  )
}

export default Contact
