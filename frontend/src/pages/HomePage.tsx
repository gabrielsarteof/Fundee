import TopicButton from "../components/TopicButton";

function HomePage() {
  return (
    <div className="p-4" style={{ flex: 1 }}>
      <input type="text" className="form-control mb-3" placeholder="Buscar criadores ou tópicos" />

      <div className="mb-4 d-flex gap-2 flex-wrap">
        {['Tudo', 'Cultura pop', 'Comédia', 'Jogos de RPG', 'Crimes reais', 'Tutoriais de arte', 'Artesanato', 'Ilustrador', 'Educação musical'].map((label) => (
          <button key={label} className="btn btn-secondary btn-sm">{label}</button>
        ))}
      </div>

      <h5>Em alta esta semana</h5>
      <div className="row row-cols-2 row-cols-md-3 g-3 mb-5">
        {[
          ['Chico Felitti', 'Podcasts'],
          ['cfemen', 'Game Content Creator'],
          ['Game Mess', 'creating podcasts and gaming content'],
          ['matt bernstein', 'creating accessible social and political commentary'],
          ['Monstrous Encounters', 'creating 3D Printed Miniatures'],
          ['For the Love of Kitten Rescue', 'creating fun & educational content about kitten rescue & foster'],
          ['Matt and Shanes Secret Podcast', 'Creating Hot Casts'],
          ['Melvor Idle', 'Developed by Games by Malcs, based in Australia.'],
          ['Cold Ones', 'Creating Drunk Content']
        ].map(([name, desc], i) => (
          <div className="col" key={i}>
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-title">{name}</h6>
                <p className="card-text small">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h5>Explorar tópicos</h5>
      <div className="d-flex flex-wrap gap-3">
        {['Podcasts e shows', 'Jogos de mesa', 'Música', 'Escrita', 'Aplicativos e software'].map((topic, i) => (
          <TopicButton key={i} label={topic} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;