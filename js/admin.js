const API = "http://localhost:3000/api";
const token = localStorage.getItem("token");

/* STATUS BADGE */
function badge(status) {
  if (status === "approved") return `<span class="badge bg-success">Approved</span>`;
  if (status === "rejected") return `<span class="badge bg-danger">Rejected</span>`;
  return `<span class="badge bg-warning text-dark">Pending</span>`;
}

/* LOAD POSTS */
fetch(`${API}/posts`, {
  headers: { Authorization: token }
})
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("posts");
    data.forEach(p => {
      tbody.innerHTML += `
        <tr>
          <td>${p.content}</td>
          <td>${badge(p.status)}</td>
          <td>
            <button class="btn btn-success btn-sm"
              onclick="updatePost(${p.id}, 'approved')">Approve</button>
            <button class="btn btn-danger btn-sm"
              onclick="updatePost(${p.id}, 'rejected')">Reject</button>
          </td>
        </tr>`;
    });
  });

function updatePost(id, status) {
  fetch(`${API}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ status })
  }).then(() => location.reload());
}

/* LOAD APPOINTMENTS */
fetch(`${API}/appointments`, {
  headers: { Authorization: token }
})
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("appointments");
    data.forEach(a => {
      tbody.innerHTML += `
        <tr>
          <td>${a.doctor}</td>
          <td>${a.date}</td>
          <td>${badge(a.status)}</td>
          <td>
            <button class="btn btn-success btn-sm"
              onclick="updateAppointment(${a.id}, 'approved')">Approve</button>
            <button class="btn btn-danger btn-sm"
              onclick="updateAppointment(${a.id}, 'rejected')">Reject</button>
          </td>
        </tr>`;
    });
  });

function updateAppointment(id, status) {
  fetch(`${API}/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ status })
  }).then(() => location.reload());
}

/* ADD DOCTOR */
function addDoctor() {
  fetch(`${API}/doctors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      name: dname.value,
      specialization: spec.value
    })
  }).then(r => r.text()).then(alert);
}
