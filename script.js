const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu_bar");
const closeBtn = document.querySelector("#close_btn");
const themeToggler = document.querySelector(".theme-toggler");
const dashboardContent = document.getElementById("dashboard-content");
const receivesContent = document.getElementById("receives-content");
const rightSection = document.querySelector(".right");
const menuItems = document.querySelectorAll("aside a");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

const removeActiveState = () => {
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });
};

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", (event) => {
    event.preventDefault();
    const clickedId = menuItem.getAttribute("id");

    removeActiveState();
    menuItem.classList.add("active");

    if (clickedId === "receives-tab") {
      dashboardContent.style.display = "none";
      rightSection.style.display = "none";
      receivesContent.style.display = "block";
    } else if (clickedId === "customers-tab") {
      dashboardContent.style.display = "block";
      rightSection.style.display = "block";
      receivesContent.style.display = "none";
    }
  });
});

const orderStatusData = {
  labels: ["Entregues", "Atrasados", "A Caminho"],
  datasets: [
    {
      label: "Situação dos Pedidos",
      data: [50, 30, 20],
      backgroundColor: ["#41f1b6", "#ff7782", "#7c88ed"],
      borderColor: ["#41f1b6", "#ff7782", "#7c88ed"],
      borderWidth: 1,
    },
  ],
};

const pieConfig = {
  type: "pie",
  data: orderStatusData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
      datalabels: {
        formatter: (value, ctx) => {
          let total = ctx.dataset.data.reduce((acc, curr) => acc + curr, 0);
          let percentage = ((value / total) * 100).toFixed(2);
          return percentage + "%";
        },
        color: "#000",
        font: {
          weight: "bold",
          size: 20,
        },
      },
    },
  },
};

const ordersPieChart = new Chart(
  document.getElementById("ordersPieChart"),
  pieConfig
);

const statusDetailsDiv = document.getElementById("statusDetails");
const statuses = ["Concluídos", "Atrasados", "A Caminho"];
const dataValues = orderStatusData.datasets[0].data;

statuses.forEach((status, index) => {
  const value = dataValues[index];
  const statusElement = document.createElement("p");

  statusElement.textContent = `${status}: ${value}%`;

  if (status === "Concluídos") {
    statusElement.classList.add("status-concluidos");
  } else if (status === "Atrasados") {
    statusElement.classList.add("status-atrasados");
  } else if (status === "A Caminho") {
    statusElement.classList.add("status-a-caminho");
  }

  statusDetailsDiv.appendChild(statusElement);
});

const pedidosACaminho = [
  { id: 1, descricao: "Pedido 101", status: "08/12/2024" },
  { id: 2, descricao: "Pedido 102", status: "15/12/2024" },
];

const pedidosAtrasados = [
  { id: 3, descricao: "Pedido 201", status: "18/12/2024" },
  { id: 4, descricao: "Pedido 202", status: "20/12/2024" },
];

const tableACaminhoBody = document
  .getElementById("tableACaminho")
  .querySelector("tbody");
pedidosACaminho.forEach((pedido) => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${pedido.id}</td><td>${pedido.descricao}</td><td>${pedido.status}</td>`;
  tableACaminhoBody.appendChild(row);
});

const tableAtrasadosBody = document
  .getElementById("tableAtrasados")
  .querySelector("tbody");
pedidosAtrasados.forEach((pedido) => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${pedido.id}</td><td>${pedido.descricao}</td><td>${pedido.status}</td>`;
  tableAtrasadosBody.appendChild(row);
});
