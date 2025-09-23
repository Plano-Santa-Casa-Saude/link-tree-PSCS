import {
  Document,
  Page,
  Image,
  StyleSheet,
  PDFViewer,
  View,
  Text,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";

// 🎨 Estilos do PDF
const styles = StyleSheet.create({
  page: { flexDirection: "column" },
  titulo: {
    display: "flex",
    textAlign: "center",
    textDecoration: "underline",
    fontSize: 10,
    fontWeight: "bold",
  },
  texto: {
    display: "flex",
    textAlign: "left",
    fontSize: 9,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

// 📄 Documento PDF
export default function PdfCartaPermanencia(props: { matricula: any }) {
  const [dadosBeneficiario, setDadosBeneficiario] =
    useState<dadosPessoais | null>(null);

  interface dadosPessoais {
    NM_SEGURADO: any;
    NR_CPF: any;
    TP_USUARIO: any;
    DT_CADASTRO: any;
    DATA_FIM: any;
    NM_RESPONSAVEL_FINANCEIRO: any;
    NR_CPF_CGC: any;
    MENSALIDADE: any;
    ADIMPLENTE: any;
    DS_PLANO: any;
    ANS: any;
    TP_CONTRATACAO: any;
    DS_TIP_PLANO: any;
    TP_ABRANGENCIA: any;
    DS_TIP_ACOMODACAO: any;
    REGULAMENTADO: any;
    PORTABILIDADE: any;
    URGENCIA_EMERGENCIA: any;
    CONSULTA: any;
    SIMPLES: any;
    ESPECIAL: any;
    INTERNACAO: any;
    PARTO: any;
    TERAPIA: any;
    DLP: any;
    DT_ATUAL: any;
  }

  const buscarBeneficiario = async () => {
    let dados: dadosPessoais;
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/declaracao-permanencia/${props.matricula}`
      );
      const data = await response.json();
      const b = data.declaracao[0];

      dados = {
        NM_SEGURADO: b.NM_SEGURADO,
        NR_CPF: b.NR_CPF,
        TP_USUARIO: b.TP_USUARIO,
        DT_CADASTRO: b.DT_CADASTRO,
        DATA_FIM: b.DATA_FIM,
        NM_RESPONSAVEL_FINANCEIRO: b.NM_RESPONSAVEL_FINANCEIRO,
        NR_CPF_CGC: b.NR_CPF_CGC,
        MENSALIDADE: b.MENSALIDADE,
        ADIMPLENTE: b.ADIMPLENTE,
        DS_PLANO: b.DS_PLANO,
        ANS: b.ANS,
        TP_CONTRATACAO: b.TP_CONTRATACAO,
        DS_TIP_PLANO: b.DS_TIP_PLANO,
        TP_ABRANGENCIA: b.TP_ABRANGENCIA,
        DS_TIP_ACOMODACAO: b.DS_TIP_ACOMODACAO,
        REGULAMENTADO: b.REGULAMENTADO,
        PORTABILIDADE: b.PORTABILIDADE,
        URGENCIA_EMERGENCIA: b.URGENCIA_EMERGENCIA,
        CONSULTA: b.CONSULTA,
        SIMPLES: b.SIMPLES,
        ESPECIAL: b.ESPECIAL,
        INTERNACAO: b.INTERNACAO,
        PARTO: b.PARTO,
        TERAPIA: b.TERAPIA,
        DLP: b.DLP,
        DT_ATUAL: b.DT_ATUAL,
      };
      console.log(dados);
      setDadosBeneficiario(dados);
    } catch (error) {
      console.error("Erro ao buscar dados do beneficiário:", error);
    }
  };

  useEffect(() => {
    if (props.matricula) {
      buscarBeneficiario();
    }
  }, [props.matricula]);

  return (
    <>
      <PDFViewer width="100%" height="100%">
        <Document
          title={"Carta de permanência " + dadosBeneficiario?.NM_SEGURADO}
        >
          <Page size="A4" style={styles.page}>
            <Image
              style={{
                width: "auto",
                height: 70,
                margin: 10,
                alignSelf: "flex-end",
              }}
              src="/public/images/logo_scs.png"
            />
            <View>
              <Text style={styles.titulo}>DECLARAÇÃO DE PERMANÊNCIA</Text>
            </View>
            <View>
              <Text style={styles.texto}>
                A Associação Santa Casa Saúde de São José dos Campos, inscrita
                no CNPJ/MF sob n.° 18.321.477/0001-34, devidamente registrada na
                ANS sob nº 41.924-9, declara para os devidos fins que{" "}
                {dadosBeneficiario?.NM_SEGURADO} inscrito (a) sob o nº de CPF:{" "}
                {dadosBeneficiario?.NR_CPF}, na condição de{" "}
                {dadosBeneficiario?.TP_USUARIO}, faz parte do quadro de
                beneficiários desta Operadora, desde{" "}
                {dadosBeneficiario?.DT_CADASTRO} até{" "}
                {dadosBeneficiario?.DATA_FIM} , nos seguintes termos:
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "67%" }]}>
                Nome da Empresa / Responsável Financeiro:
              </Text>
              <Text style={[styles.texto, { width: "33%" }]}>CNPJ / CPF:</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "67%" }]}>
                {dadosBeneficiario?.NM_RESPONSAVEL_FINANCEIRO}
              </Text>
              <Text style={[styles.texto, { width: "33%" }]}>
                {dadosBeneficiario?.NR_CPF_CGC}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "35%" }]}>
                Valor da mensalidade do beneficiário
              </Text>
              <Text style={[styles.texto, { width: "15%" }]}>Adinplência:</Text>
              <Text style={[styles.texto, { width: "17%" }]}>Adesão:</Text>
              <Text style={[styles.texto, { width: "33%" }]}>Exclusão:</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "35%" }]}>
                {"R$ " + dadosBeneficiario?.MENSALIDADE}
              </Text>
              <Text style={[styles.texto, { width: "15%" }]}>
                {dadosBeneficiario?.ADIMPLENTE}
              </Text>
              <Text style={[styles.texto, { width: "17%" }]}>
                {dadosBeneficiario?.DT_CADASTRO}
              </Text>
              <Text style={[styles.texto, { width: "33%" }]}>
                {dadosBeneficiario?.DATA_FIM}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "50%" }]}>
                Nome do Comercial do Produto:
              </Text>
              <Text style={[styles.texto, { width: "50%" }]}>
                Registro do Produto na ANS:
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "50%" }]}>
                {dadosBeneficiario?.DS_PLANO}
              </Text>
              <Text style={[styles.texto, { width: "50%" }]}>
                {dadosBeneficiario?.ANS}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "50%" }]}>Contratação:</Text>
              <Text style={[styles.texto, { width: "50%" }]}>
                Segmentação Assistencial:
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "50%" }]}>
                {dadosBeneficiario?.TP_CONTRATACAO}
              </Text>
              <Text style={[styles.texto, { width: "50%" }]}>
                {dadosBeneficiario?.DS_TIP_PLANO}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "50%" }]}>
                Abrangência Geográfica:
              </Text>
              <Text style={[styles.texto, { width: "50%" }]}>
                Padrão de Acomodação:
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "50%" }]}>
                {dadosBeneficiario?.TP_ABRANGENCIA}
              </Text>
              <Text style={[styles.texto, { width: "50%" }]}>
                {dadosBeneficiario?.DS_TIP_ACOMODACAO}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "50%" }]}>
                Regulamentado/Adaptado à Lei 9.656/98:
              </Text>
              <Text style={[styles.texto, { width: "50%" }]}>
                Ingresso por portabilidade:
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "50%" }]}>
                {dadosBeneficiario?.REGULAMENTADO}
              </Text>
              <Text style={[styles.texto, { width: "50%" }]}>
                {dadosBeneficiario?.PORTABILIDADE}
              </Text>
            </View>
            <View>
              <Text
                style={[styles.titulo, { marginTop: 15, marginBottom: 10 }]}
              >
                CUMPRIMENTO DE CARÊNCIAS
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "40%" }]}>Cobertura</Text>
              <Text style={[styles.texto, { width: "10%" }]}>Data Final</Text>
              <Text style={[styles.texto, { width: "40%" }]}>Cobertura</Text>
              <Text style={[styles.texto, { width: "10%" }]}>Data Final</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "40%" }]}>
                Urgência e emergência
              </Text>
              <Text style={[styles.texto, { width: "10%" }]}>
                {dadosBeneficiario?.URGENCIA_EMERGENCIA}
              </Text>
              <Text style={[styles.texto, { width: "40%" }]}>Internação</Text>
              <Text style={[styles.texto, { width: "10%" }]}>
                {dadosBeneficiario?.INTERNACAO}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "40%" }]}>Consultas</Text>
              <Text style={[styles.texto, { width: "10%" }]}>
                {dadosBeneficiario?.CONSULTA}
              </Text>
              <Text style={[styles.texto, { width: "40%" }]}>
                Parto a termo
              </Text>
              <Text style={[styles.texto, { width: "10%" }]}>
                {dadosBeneficiario?.PARTO}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "40%" }]}>
                Exames Simples
              </Text>
              <Text style={[styles.texto, { width: "10%" }]}>
                {dadosBeneficiario?.SIMPLES}
              </Text>
              <Text style={[styles.texto, { width: "40%" }]}>Terapia</Text>
              <Text style={[styles.texto, { width: "10%" }]}>
                {dadosBeneficiario?.TERAPIA}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.texto, { width: "40%" }]}>
                Exames Especiais /Procedimento de Alta Complexidade
              </Text>
              <Text style={[styles.texto, { width: "10%" }]}>
                {dadosBeneficiario?.ESPECIAL}
              </Text>
              <Text style={[styles.texto, { width: "40%" }]}>DLP</Text>
              <Text style={[styles.texto, { width: "10%" }]}>
                {dadosBeneficiario?.DLP}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 8,
                  marginRight: 20,
                  marginLeft: 20,
                  marginTop: 20,
                }}
              >
                Ressaltamos ainda que os prazos deverão ser observados em
                cumprimento a Resolução Normativa – RN 438/18 da ANS, quanto ao
                exercício do direito de Portabilidade, em especial ao que se
                refere à extinção do vinculo por Rescisão de Contrato, conforme
                §1º, inciso IV do artigo 8º desta Normativa.
              </Text>
            </View>
            <View style={{ flexDirection: "row", margin: 20 }}>
              <View style={{ width: "2%" }}>
                <Image
                  style={{
                    width: "auto",
                    height: 80,
                    alignSelf: "flex-start",
                  }}
                  src="/public/images/ans-black-lado.jpg"
                />
              </View>
              <View
                style={{
                  display: "flex",
                  width: "98%",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    display: "flex",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  São José dos Campos,{dadosBeneficiario?.DT_ATUAL}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    display: "flex",
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  ASSOCIAÇÃO SANTA CASA SAÚDE DE SÃO JOSE DOS CAMPOS
                </Text>
                <Text
                  style={{ fontSize: 8, display: "flex", textAlign: "center" }}
                >
                  CNPJ: 18.321.477/0001-34
                </Text>
                <Text
                  style={{ fontSize: 8, display: "flex", textAlign: "center" }}
                >
                  Registro na ANS: 41.924-9
                </Text>
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 20, // distância da borda inferior
                left: 0,
                right: 0,
                textAlign: "center",
                fontSize: 7,
              }}
              fixed
            >
              <Text>
                Av. Dr. João Guilhermino, nº 465 – Centro, São José dos Campos -
                CEP: 12210-130 - Tel (12) 3876-9600
              </Text>
              <Text>www.santacasasaudesjc.com.br</Text>
              <Text>Gerado pelo Zelus Data: {new Date().toLocaleString()}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
}
