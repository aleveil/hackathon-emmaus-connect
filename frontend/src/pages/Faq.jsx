import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Faq() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>À quoi sert ce site ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Ce site permet d'estimer un prix pour un téléphone en fonction de
              son modèle, sa catégorie et des caractéristiques et une
              pondérance.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>À quoi sert cet FAQ ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Cette FAQ sert de tutos sur comment utiliser ce site.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              Comment chercher une marque, un modèle, etc. ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Cliquer sur les 3 points sur la colonne dont vous voulez faire la
              recherche.
              <br />
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/faqs/img1.png`}
                alt=""
              />
              <br />
              <br />
              Cliquez sur 'Filter'.
              <br />
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/faqs/img2.png`}
                alt=""
              />
              <br />
              <br />
              Taper ou sélectionner les infos que vous cherchez dans la 3è
              partie.
              <br />
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/faqs/img3.png`}
                alt=""
              />
              <br />
              <br />
              /!\ VOUS NE POUVEZ FAIRE QU'UNE RECHERCHE À LA FOIS /!\
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              Comment estimer la valeur du téléphone face à moi ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1ère étape : Recherchez le téléphone.
              <br />
              2è étape : Ouvrez sa page (en cliquant sur le petit oeil).
              <br />
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/faqs/img4.png`}
                alt=""
              />
              <br />
              <br />
              3è étape : Rentrez la pondération.
              <br />
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/faqs/img5.png`}
                alt=""
              />
              <br />
              <br />
              Et voilà votre prix estimé ;)
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              C'est quoi la pondération ? Pourquoi l'utiliser ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              La pondération sert à modifié le prix suggéré.
              <br />
              <br />
              En fonction de l'état du téléphone ou d'autres critères, vous
              pouvez augmenter ou diminuer le prix.
              <br />
              <br />
              Une pondération négative sert à baisser le prix.
              <br />
              Une pondération positime permet de monter le prix.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              Pourquoi je ne peux pas ajouter de téléphone ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Seul les admins peuvent ajouter des types de téléphones.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              Comment est définie la catégorie ? Le prix ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              La catégorie et le prix sont définis par 2 critères : la RAM et le
              stockage.
              <br />
              <br />
              Il y a 5 catégories :
              <ul>
                <li>1 - HC</li>
                <li>2 - C</li>
                <li>3 - B</li>
                <li>4 - A</li>
                <li>5 - Premium</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>C'est quoi un admin ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Un administrateur est une personne qui gère le site.
              <br />
              Il peut ajouter ou modifier des types de téléphones, ainsi que des
              nouveaux utilisateurs.
              <br />
              La personne qui t'a donné ton compte est sûrement un admin.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              Pourquoi un type de téléphone n'a pas de photo ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Il n'a pas de photo ... parce qu'il n'a pas de photo. :P
              <br />
              Plus sérieusement, n'hésite pas à fournir à un administrateur la
              photo de ce téléphone.
              <br />
              Cela l'aidera sûrement.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              Il y a une erreur sur le site, qu'est-ce que je fait ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Remonte-la à ton supérieur ou un administrateur.
              <br />
              L'équipe d'Emmaüs te remercie d'aider à améliorer cet outil.
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* Accordéon type */}
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Titre</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, tenetur eum? Eveniet mollitia expedita officiis quaerat libero! Sunt provident consequuntur, at cumque assumenda aspernatur optio eaque doloremque vitae possimus iure.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
      </div>
    </div>
  );
}
