import { salvar, listar } from "./firebase/crud.js";

const inputNome = document.getElementById("input-nome");
const inputData = document.getElementById("input-data");
const inputImagem = document.getElementById("input-imagem");

const btnEnviar = document.getElementById("btn-enviar");

const lista = document.getElementById("lista-aniversarios");

function converterBase64(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();

    leitor.readAsDataURL(arquivo);

    leitor.onload = () => resolve(leitor.result);
    leitor.onerror = (error) => reject(error);
  });
}

if (btnEnviar) {
  btnEnviar.addEventListener("click", async () => {
    let nome = inputNome.value.trim();
    let data = inputData.value.trim();

    const arquivo = inputImagem.files[0];

    if (!nome || !data || !arquivo) {
      alert("Preencha tudo.");
      return;
    }

    try {
      const imagemBase64 = await converterBase64(arquivo);

      await salvar(nome, data, imagemBase64);

      alert("Salvo.");

      inputNome.value = "";
      inputData.value = "";
      inputImagem.value = "";
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar.");
    }
  });

  inputData.addEventListener("input", () => {
    let valor = inputData.value.replace(/\D/g, "");

    valor = valor.slice(0, 4);

    if (valor.length > 2) {
      valor = valor.slice(0, 2) + "/" + valor.slice(2);
    }

    inputData.value = valor;
  });

  inputData.addEventListener("blur", () => {
    const partes = inputData.value.split("/");

    if (partes.length !== 2) {
      alert("Data inválida");
      inputData.value = "";
      return;
    }

    const dia = Number(partes[0]);
    const mes = Number(partes[1]);

    if (
      isNaN(dia) ||
      isNaN(mes) ||
      dia < 1 ||
      dia > 31 ||
      mes < 1 ||
      mes > 12
    ) {
      alert("Data inválida");
      inputData.value = "";
    }
  });
}

if (lista) {
  carregar();
}

async function carregar() {
  try {
    const pessoas = await listar();

    lista.innerHTML = "";

    const hoje = new Date();

    const arrayPessoas = Object.entries(pessoas).map(([id, pessoa]) => {
      const [dia, mes] = pessoa.data.split("/").map(Number);

      let aniversario = new Date(hoje.getFullYear(), mes - 1, dia);

      if (aniversario < hoje) {
        aniversario.setFullYear(hoje.getFullYear() + 1);
      }

      return {
        id,
        ...pessoa,
        aniversario,
      };
    });

    arrayPessoas.sort((a, b) => a.aniversario - b.aniversario);

    arrayPessoas.forEach((pessoa) => {
      const hojeTexto = hoje.toDateString();
      const aniversarioTexto = pessoa.aniversario.toDateString();

      let status = "";

      if (hojeTexto === aniversarioTexto) {
        status = "🎉 Hoje";
      } else {
        const diff = pessoa.aniversario - hoje;

        const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));

        status = `Faltam ${dias} dias`;
      }

      lista.innerHTML += `
        <li class="card-aniversario">
          <img src="${pessoa.imagem}" alt="${pessoa.nome}" />

          <div class="info-aniversario">
            <h3>${pessoa.nome}</h3>

            <p>${pessoa.data}</p>

            <span>${status}</span>
          </div>
        </li>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}
