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
  page: { flexDirection: "column" },
  title: { fontSize: 20, marginBottom: 10 },
  section: { margin: 10, padding: 10, border: "1pt solid black" },
});

export default function PdfCarteirinha(props: { matricula: any }) {
  const [carteirinha, setCarteirinha] = useState<mascaraCarteirinha | null>(
    null
  );
  const [carencias, setCarencias] = useState<mascaraCarencia[]>([]);

  interface mascaraCarencia {
    CARENCIA: string;
  }

  interface mascaraCarteirinha {
    CD_MAT_ALTERNATIVA: any;
    NM_SEGURADO: any;
    CD_PLANO: any;
    DS_PLANO: any;
    PLANO: any;
    DT_NASCIMENTO: any;
    NR_CNS: any;
    TITULAR: any;
    CD_CONTRATO: any;
    DT_ADESAO: any;
  }

  useEffect(() => {
    if (props.matricula) {
      buscarCarteirinha();
      buscarCarencias();
    }
  }, [props.matricula]);

  const buscarCarteirinha = async () => {
    let dados: mascaraCarteirinha;
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/carteirinha/${props.matricula}`
      );
      const data = await response.json();
      const b = data.carteirinha[0];

      dados = {
        CD_MAT_ALTERNATIVA: b.CD_MAT_ALTERNATIVA,
        NM_SEGURADO: b.NM_SEGURADO,
        CD_PLANO: b.CD_PLANO,
        DS_PLANO: b.DS_PLANO,
        PLANO: b.PLANO,
        DT_NASCIMENTO: b.DT_NASCIMENTO,
        NR_CNS: b.NR_CNS,
        TITULAR: b.TITULAR,
        CD_CONTRATO: b.CD_CONTRATO,
        DT_ADESAO: b.DT_ADESAO,
      };

      setCarteirinha(dados);
    } catch (error) {
      console.error("Erro ao buscar dados do beneficiário:", error);
    }
  };

  const buscarCarencias = async () => {
    //let dados: mascaraCarteirinha;
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/carteirinha/carencia/${props.matricula}`
      );
      const data = await response.json();

      setCarencias(data.carencias);
    } catch (error) {
      console.error("Erro ao buscar as carencias:", error);
    }
  };

  return (
    <>
      <PDFViewer width="100%" height="100%">
        <Document
          author="Zelus"
          title={"Carteirinha - " + props.matricula}
        >
          <Page size="A4" style={styles.page} orientation="landscape">
            <View
              style={{
                width: "98%",
                height: "95%",
                margin: 10,
                borderWidth: 3,
                borderColor: "black",
                borderRadius: 5,
                padding: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                  {props.matricula}
                </Text>
                <Image
                  style={{
                    width: "auto",
                    height: 30,
                    marginLeft: "45%",
                    marginTop: 5,
                  }}
                  src="/images/ans-black.jpg"
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                  {carteirinha?.NM_SEGURADO}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 25 }}>
                  Plano {carteirinha?.DS_PLANO}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 25, width: "50%" }}>
                  Dt. Nasc. {carteirinha?.DT_NASCIMENTO}
                </Text>
                <Text style={{ fontSize: 25, width: "50%" }}>
                  CNS {carteirinha?.NR_CNS}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 25, width: "50%" }}>
                  Titular: {carteirinha?.TITULAR}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 25, width: "50%", fontWeight: "bold" }}
                >
                  {carteirinha?.TITULAR} - {carteirinha?.CD_CONTRATO}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 25, width: "50%" }}>
                  Dt. Inclusão {carteirinha?.DT_ADESAO}
                </Text>
                <Text style={{ fontSize: 25, width: "50%" }}>
                  CONTRATO: {carteirinha?.CD_CONTRATO}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 25, width: "20%" }}>Carências:</Text>
                <Text style={{ fontSize: 25, width: "80%" }}>
                  CENTRAL DE ATENDIMENTO: (12) 3876-9600
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "25%" }}>
                  <Text style={{ fontSize: 18, marginTop: 10 }}>
                    {carencias[0]?.CARENCIA}
                  </Text>
                  <Text style={{ fontSize: 18, marginTop: 10 }}>
                    {carencias[1]?.CARENCIA}
                  </Text>
                  <Text style={{ fontSize: 18, marginTop: 10 }}>
                    {carencias[2]?.CARENCIA}
                  </Text>
                </View>
                <View style={{ flexDirection: "column", width: "25%" }}>
                  <Text style={{ fontSize: 18, marginTop: 10 }}>
                    {carencias[3]?.CARENCIA}
                  </Text>
                  <Text style={{ fontSize: 18, marginTop: 10 }}>
                    {carencias[4]?.CARENCIA}
                  </Text>
                  <Text style={{ fontSize: 18, marginTop: 10 }}>
                    {carencias[5]?.CARENCIA}
                  </Text>
                </View>
                <View style={{ flexDirection: "column", width: "25%" }}>
                  <Text style={{ fontSize: 18, marginTop: 10 }}>
                    {carencias[6]?.CARENCIA}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 23, textAlign: "center" }}>
                  ATENDIMENTO VÁLIDO SOMENTE COM APRESENTAÇÃO DO RG
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 50,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {props.matricula}
                </Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
}
