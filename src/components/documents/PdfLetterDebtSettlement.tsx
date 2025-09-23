import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";

// 🎨 Estilos do PDF
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 10 },
  title: { fontSize: 20, marginBottom: 10 },
  section: { margin: 10, padding: 10, border: "1pt solid black" },
});

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

// 📄 Documento PDF
export default function PdfQuitacaoDividas(props: {
  contrato: any;
  dtInicio: any;
  dtFim: any;
}) {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, "0"); // Obtém o dia e garante 2 dígitos (ex: 05)
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Obtém o mês (0-11) e ajusta +1, garantindo 2 dígitos
  const ano = data.getFullYear(); // Obtém o ano completo (ex: 2025)
  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");
  const segundo = String(data.getSeconds()).padStart(2, "0");
  const dataFormatada = `${dia}/${mes}/${ano}`; // Formata para dd/mm/aaaa
  const horarioFormatado = `${hora}:${minuto}:${segundo}`;

  const [mensalidades, setMensalidades] = useState([]);

  const [dadosBeneficiario, setDadosBeneficiario] =
    useState<dadosPessoais | null>(null);

  interface dadosPessoais {
    CD_MATRICULA: any;
    DS_PLANO: any;
    REG_ANS: any;
    CD_CONTRATO: any;
    NM_RESPONSAVEL_FINANCEIRO: any;
    CD_MULTI_EMPRESA: any;
    CPF: any;
  }

  interface mascaraMensalidades {
    DT_VENCIMENTO: any;
    CD_MENS_CONTRATO: any;
    VL_RECEBIMENTO: any;
    DT_RECEBIMENTO: any;
  }

  const buscarBeneficiario = async () => {
    let dados: dadosPessoais;
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/usuario-quitacao/${props.contrato}`
      );
      const data = await response.json();
      const b = data.usuarioQuitacao[0];

      dados = {
        CD_MATRICULA: b.CD_MATRICULA,
        DS_PLANO: b.DS_PLANO,
        REG_ANS: b.REG_ANS,
        CD_CONTRATO: b.CD_CONTRATO,
        NM_RESPONSAVEL_FINANCEIRO: b.NM_RESPONSAVEL_FINANCEIRO,
        CD_MULTI_EMPRESA: b.CD_MULTI_EMPRESA,
        CPF: b.CPF,
      };
      console.log(dados);
      setDadosBeneficiario(dados);
    } catch (error) {
      console.error("Erro ao buscar dados do beneficiário:", error);
    }
  };

  const buscarMensalidades = async () => {
    const periodo = {
      datainicio: `${props.dtInicio}`,
      datafim: `${props.dtFim}`,
    };

    try {
      const response = await fetch(
        `http://10.201.0.39:3333/mensalidade-filtradas/${props.contrato}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // tipo de dado que vai enviar
          },
          body: JSON.stringify(periodo), // transforma em JSON
        }
      );

      const data = await response.json();
      setMensalidades(data.mensalidades);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    if (props.contrato) {
      buscarBeneficiario();
      buscarMensalidades();
    }
  }, [props.contrato]);

  return (
    <>
      <PDFViewer width="100%" height="100%">
        <Document
          author="Zelus"
          title={"Carta de Quitação de Débitos - " + props.contrato}
        >
          <Page size="A4" style={styles.page}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  width: "auto",
                  height: 52,
                  alignSelf: "flex-start",
                }}
                src="/public/images/logo_scs.png"
              />
              <View style={{ width: "45%", marginTop: 10 }}>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  ASSOCIACAO SANTA CASA SAUDE
                </Text>
                <Text style={{ fontSize: 8 }}>
                  Endereço: Av. Dr. Joao Guilhermino, CENTRO - 465, Cep:12210130
                  -SAO JOSE DOS CAMPOS - SP Telefone 123876-9600
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row", width: "50%" }}>
                    <Text style={{ fontSize: 8, fontWeight: "bold" }}>
                      Registro na ANS:
                    </Text>
                    <Text style={{ fontSize: 8 }}>41.924-9 </Text>
                  </View>
                  <View style={{ flexDirection: "row", width: "50%" }}>
                    <Text style={{ fontSize: 8, fontWeight: "bold" }}>
                      CNPJ
                    </Text>
                    <Text style={{ fontSize: 8 }}>18.321.477/0001-34</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 25, marginLeft: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 8, fontWeight: "bold" }}>Data:</Text>
                  <Text style={{ fontSize: 8 }}> {dataFormatada}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 8, fontWeight: "bold" }}>Hora:</Text>
                  <Text style={{ fontSize: 8 }}> {horarioFormatado}</Text>
                </View>
                <Text style={{ fontSize: 8, fontWeight: "bold" }}>
                  Versão 1.0
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center", margin: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                COMPROVANTE DE QUITAÇÃO
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "black",
                marginBottom: 2, // espaço entre as linhas
                marginLeft: 10,
                marginRight: 10,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                borderTopWidth: 1,
                borderTopColor: "black",
                marginLeft: 10,
                marginRight: 10,
                paddingTop: 5,
              }}
            >
              <Text style={{ fontSize: 8 }}>
                Em atendimento à Lei 12.007/2009, artigos 1º e seguintes,
                DECLARAMOS, para os devidos fins, que os períodos de{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {formatDate(props.dtInicio)}
                </Text>{" "}
                -{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {formatDate(props.dtFim)}
                </Text>{" "}
                se encontram quitados no que se refere ao contrato sob o n.º{" "}
                <Text style={{ fontWeight: "bold" }}>{props.contrato}</Text>{" "}
                referente à contratação de plano de saúde denominado{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {dadosBeneficiario?.DS_PLANO}
                </Text>{" "}
                com registro ANS sob o n.º{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {dadosBeneficiario?.REG_ANS}
                </Text>{" "}
                em nome do(a) beneficiário(a) titular{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {dadosBeneficiario?.NM_RESPONSAVEL_FINANCEIRO}
                </Text>{" "}
                sob matrícula de n.º{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {dadosBeneficiario?.CD_MATRICULA}
                </Text>
                , inscrito(a) sob o n.º de CPF{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {dadosBeneficiario?.CPF}
                </Text>
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "black",
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 8,
                  width: "25%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Vencimento
              </Text>
              <Text
                style={{
                  fontSize: 8,
                  width: "25%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Documento
              </Text>
              <Text
                style={{
                  fontSize: 8,
                  width: "25%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Recebimento
              </Text>
              <Text
                style={{
                  fontSize: 8,
                  width: "25%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Valor
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "black",
                marginTop: 2, // espaço entre as linhas
                marginLeft: 10,
                marginRight: 10,
              }}
            />
            <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
              {mensalidades.map((mensalidade: mascaraMensalidades) => (
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                  <Text
                    style={{ width: "25%", fontSize: 8, textAlign: "center" }}
                  >
                    {mensalidade.DT_VENCIMENTO}
                  </Text>
                  <Text
                    style={{ width: "25%", fontSize: 8, textAlign: "center" }}
                  >
                    {mensalidade.CD_MENS_CONTRATO}
                  </Text>
                  <Text
                    style={{ width: "25%", fontSize: 8, textAlign: "center" }}
                  >
                    {mensalidade.DT_RECEBIMENTO}
                  </Text>
                  <Text
                    style={{ width: "25%", fontSize: 8, textAlign: "center" }}
                  >
                    {mensalidade.VL_RECEBIMENTO.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>
                </View>
              ))}
            </View>

            <View
              style={{
                position: "absolute",
                bottom: 5, // distância da borda inferior
                left: 5,
                right: 0,
                textAlign: "left",
                fontSize: 8,
              }}
              fixed
            >
              <View style={{ alignItems: "center", display: "flex" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    fontWeight: "bold",
                    marginBottom: 20,
                    paddingTop: 10,
                    borderTopWidth: 1,
                    borderTopColor: "black",
                    width: "50%",
                  }}
                >
                  ASSOCIACAO SANTA CASA SAUDE
                </Text>
              </View>
              <Text>Gerado pelo Zelus Data: {new Date().toLocaleString()}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
}
