from langgraph.graph import END
from langgraph.graph import START
from langgraph.graph import StateGraph

from onyx.agents.agent_search.deep_search_a.initial.consolidate_sub_answers.graph_builder import (
    consolidate_sub_answers_graph_builder,
)
from onyx.agents.agent_search.deep_search_a.initial.generate_initial_answer.nodes.generate_initial_answer import (
    generate_initial_answer,
)
from onyx.agents.agent_search.deep_search_a.initial.generate_initial_answer.nodes.validate_initial_answer import (
    validate_initial_answer,
)
from onyx.agents.agent_search.deep_search_a.initial.generate_initial_answer.states import (
    SearchSQInput,
)
from onyx.agents.agent_search.deep_search_a.initial.generate_initial_answer.states import (
    SearchSQState,
)
from onyx.agents.agent_search.deep_search_a.initial.retrieve_orig_question_docs.graph_builder import (
    retrieve_orig_question_docs_graph_builder,
)
from onyx.utils.logger import setup_logger

logger = setup_logger()


def generate_initial_answer_graph_builder(test_mode: bool = False) -> StateGraph:
    graph = StateGraph(
        state_schema=SearchSQState,
        input=SearchSQInput,
    )

    consolidate_sub_answers = consolidate_sub_answers_graph_builder().compile()
    graph.add_node(
        node="consolidate_sub_answers_subgraph",
        action=consolidate_sub_answers,
    )

    retrieve_orig_question_docs = retrieve_orig_question_docs_graph_builder().compile()
    graph.add_node(
        node="retrieve_orig_question_docs_subgraph",
        action=retrieve_orig_question_docs,
    )

    # graph.add_node(
    #     node="retrieval_consolidation",
    #     action=consolidate_retrieved_documents,
    # )

    graph.add_node(
        node="generate_initial_answer",
        action=generate_initial_answer,
    )

    graph.add_node(
        node="validate_initial_answer",
        action=validate_initial_answer,
    )

    ### Add edges ###

    graph.add_edge(
        start_key=START,
        end_key="retrieve_orig_question_docs_subgraph",
    )

    graph.add_edge(
        start_key=START,
        end_key="consolidate_sub_answers_subgraph",
    )

    graph.add_edge(
        start_key=[
            "retrieve_orig_question_docs_subgraph",
            "consolidate_sub_answers_subgraph",
        ],
        end_key="generate_initial_answer",
    )

    # graph.add_edge(
    #     start_key="retrieval_consolidation",
    #     end_key="generate_initial_answer",
    # )

    graph.add_edge(
        start_key="generate_initial_answer",
        end_key="validate_initial_answer",
    )

    graph.add_edge(
        start_key="validate_initial_answer",
        end_key=END,
    )

    return graph
