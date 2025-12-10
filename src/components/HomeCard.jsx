import { Card, Button } from "react-bootstrap";
import { Link } from "react-router";

export default function HomeCard({
  icon,
  title,
  text,
  buttonLabel,
  buttonVariant = "primary",
  buttonLink,
}) {
  return (
    <Card style={{ marginBottom: "1rem", border: "4px solid black" }}>
      <Card.Body>
        <Card.Title>
          {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
          {title}
        </Card.Title>
        <Card.Text>{text}</Card.Text>
        {buttonLabel && buttonLink && (
          <Button
            as={Link}
            to={buttonLink}
            variant={buttonVariant}
            style={{ fontWeight: "bold", boxShadow: "0 4px 8px rgba(0,0,0,0.5)" }}
          >
            {buttonLabel}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}