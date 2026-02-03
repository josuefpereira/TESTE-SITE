const form = document.querySelector("#cadastro-form");

const fieldLabels = {
  nome: "Nome completo",
  cpf: "CPF",
  nascimento: "Data de nascimento",
  email: "E-mail",
  telefone: "Telefone",
  estadoCivil: "Estado civil",
  endereco: "Endereço",
  bairro: "Bairro",
  cidade: "Cidade",
  estado: "Estado",
  cep: "CEP",
  profissao: "Profissão",
  observacoes: "Observações",
};

const formatDate = (value) => {
  if (!value) return "-";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
};

const generatePdf = (values) => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Cadastro de Dados", 14, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const lines = Object.entries(values).map(([key, value]) => {
    const label = fieldLabels[key] || key;
    const formattedValue = value || "-";
    return `${label}: ${formattedValue}`;
  });

  const wrappedLines = doc.splitTextToSize(lines, 180);
  doc.text(wrappedLines, 14, 34);

  doc.setFontSize(10);
  doc.text("Gerado automaticamente pelo Cadastro Fácil", 14, 285);

  doc.save(`cadastro-${values.nome || "cliente"}.pdf`);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());
  values.nascimento = formatDate(values.nascimento);

  generatePdf(values);
});
