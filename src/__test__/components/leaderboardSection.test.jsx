import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LeaderboardSeciton from "../../components/LeaderboardSeciton";

const leaderboards = [
  {
    user: {
      id: "1",
      name: "Fadli",
      email: "fadli@example.com",
      avatar: "https://example.com/fadli.png",
    },
    score: 100,
  },
  {
    user: {
      id: "2",
      name: "Dzakim",
      email: "dzakim@example.com",
      avatar: "https://example.com/dzakim.png",
    },
    score: 90,
  },
  {
    user: {
      id: "3",
      name: "Rizal",
      email: "Rizal@example.com",
      avatar: "https://example.com/rizal.png",
    },
    score: 80,
  },
];

describe("LeaderboardSection component", () => {
  it("should render the leaderboard title", () => {
    render(<LeaderboardSeciton leaderboards={[]} />);

    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
  });

  it('should display "Currently no leaderboard.." when there are no leaderboard datas', () => {
    render(<LeaderboardSeciton leaderboards={[]} />);

    expect(screen.getByText(/currently no leaderboard/i)).toBeInTheDocument();
  });

  it("should render leaderboard items correctly", () => {
    render(<LeaderboardSeciton leaderboards={leaderboards} />);

    leaderboards.forEach((item) => {
      expect(screen.getByText(item.user.name)).toBeInTheDocument();
      expect(screen.getByText(item.user.email)).toBeInTheDocument();
      expect(screen.getByText(item.score)).toBeInTheDocument();
    });
  });

  it("should apply the correct class based on the user's rank", () => {
    render(<LeaderboardSeciton leaderboards={leaderboards} />);

    const badges = screen.getAllByText(/score:/i).map((badge) => badge.nextSibling);

    expect(badges[0]).toHaveClass("badge-accent");
    expect(badges[1]).toHaveClass("badge-primary");
    expect(badges[2]).toHaveClass("badge");
  });
});
